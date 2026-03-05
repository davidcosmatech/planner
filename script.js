// StudyTrack - Student Productivity Web App
// ==========================================

// Task Manager
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
        this.loadTheme();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;

        if (!title || !deadline) {
            alert('Please fill in the required fields');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            description,
            deadline: new Date(deadline),
            priority,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.render();

        // Clear form
        document.getElementById('taskForm').reset();
        
        // Set default date to tomorrow
        this.setDefaultDeadline();
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.render();
        }
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    filterTasks() {
        const now = new Date();

        return this.tasks.filter(task => {
            switch (this.currentFilter) {
                case 'pending':
                    return !task.completed;
                case 'completed':
                    return task.completed;
                case 'overdue':
                    return !task.completed && task.deadline < now;
                case 'all':
                default:
                    return true;
            }
        });
    }

    sortTasks(tasks) {
        return tasks.sort((a, b) => {
            // Completed tasks go to the end
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            // Sort by deadline
            return a.deadline - b.deadline;
        });
    }

    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, pending, rate };
    }

    renderStats() {
        const stats = this.getStats();
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('completedTasks').textContent = stats.completed;
        document.getElementById('pendingTasks').textContent = stats.pending;
        document.getElementById('completionRate').textContent = `${stats.rate}%`;
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        const filteredTasks = this.sortTasks(this.filterTasks());

        if (filteredTasks.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No tasks found. 🎯</p></div>';
            return;
        }

        container.innerHTML = filteredTasks.map(task => this.createTaskElement(task)).join('');
        this.attachTaskEventListeners();
    }

    createTaskElement(task) {
        const now = new Date();
        const isOverdue = !task.completed && task.deadline < now;
        const deadline = new Date(task.deadline);
        const deadlineStr = this.formatDeadline(deadline);
        const statusClass = task.completed ? 'completed' : (isOverdue ? 'overdue' : 'pending');

        return `
            <div class="task-item ${task.priority}-priority ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    data-id="${task.id}"
                >
                <div class="task-content">
                    <div class="task-header">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        <div>
                            <span class="task-priority-badge priority-${task.priority}">${task.priority}</span>
                        </div>
                    </div>
                    ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                    <div class="task-meta">
                        <span class="task-deadline">
                            📅 ${deadlineStr}
                        </span>
                        <span class="status-badge status-${statusClass}">
                            ${isOverdue ? 'Overdue' : (task.completed ? 'Completed' : 'Pending')}
                        </span>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-secondary btn-small delete-btn" data-id="${task.id}">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachTaskEventListeners() {
        // Checkboxes
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.toggleTaskCompletion(id);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.deleteTask(id);
            });
        });
    }

    formatDeadline(date) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

        if (dateOnly.getTime() === todayOnly.getTime()) {
            return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
            return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        this.renderStats();
        this.renderTasks();
    }

    saveTasks() {
        const tasksToSave = this.tasks.map(task => ({
            ...task,
            deadline: task.deadline.toISOString(),
            createdAt: task.createdAt.toISOString()
        }));
        localStorage.setItem('studytrack_tasks', JSON.stringify(tasksToSave));
    }

    loadTasks() {
        const saved = localStorage.getItem('studytrack_tasks');
        if (!saved) return [];

        return JSON.parse(saved).map(task => ({
            ...task,
            deadline: new Date(task.deadline),
            createdAt: new Date(task.createdAt)
        }));
    }

    setDefaultDeadline() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0);

        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const hours = String(tomorrow.getHours()).padStart(2, '0');
        const minutes = String(tomorrow.getMinutes()).padStart(2, '0');

        document.getElementById('taskDeadline').value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const ap = new TaskManager();
    // Set default deadline on load
    ap.setDefaultDeadline();
});
