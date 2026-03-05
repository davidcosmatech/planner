# 📚 StudyTrack - Student Productivity Web App

A simple, elegant web application for students to manage homework tasks, set deadlines, and track productivity.

## 🎯 Features

✅ **Add Homework Tasks** - Create tasks with title, description, deadline, and priority level
✅ **Set & Track Deadlines** - Know exactly when assignments are due  
✅ **Task Management** - Mark tasks as complete, delete them, and filter by status
✅ **Productivity Stats** - See your total tasks, completed tasks, pending tasks, and completion rate
✅ **Smart Filtering** - Filter by All, Pending, Completed, or Overdue tasks
✅ **Dark/Light Mode** - Toggle between themes for comfortable viewing
✅ **Persistent Storage** - All tasks are saved in your browser's local storage
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## 🚀 Quick Start

1. **Open the app** - Simply open `index.html` in your web browser
2. **Add a task** - Fill in the task form and click "Add Task"
3. **Set deadline** - Choose when the task is due
4. **Pick priority** - Select Low, Medium, or High priority
5. **Track progress** - Watch your stats update in real-time
6. **Mark complete** - Check the checkbox when finished
7. **Dark mode** - Click the theme toggle in the header

## 📁 File Structure

```
planner/
├── index.html      # Main HTML structure
├── styles.css      # Styling with dark/light mode
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🎨 Features Breakdown

### Task Management
- **Add Tasks**: Title, description, deadline, and priority
- **Complete Tasks**: Check checkbox to mark as done
- **Delete Tasks**: Remove tasks you no longer need
- **View Status**: See if tasks are pending, completed, or overdue

### Productivity Stats
- **Total Tasks**: Count of all tasks
- **Completed Tasks**: How many you've finished
- **Pending Tasks**: How many are still to do
- **Completion Rate**: Percentage of completed tasks

### Filtering
- **All**: View all tasks
- **Pending**: See incomplete tasks
- **Completed**: View finished tasks
- **Overdue**: Find tasks past their deadline

### Theme Support
- **Light Mode**: Default bright theme (great for daytime)
- **Dark Mode**: Easy on the eyes (great for nighttime studying)
- Your theme preference is saved automatically

## 💾 Data Storage

All your tasks are automatically saved to your browser's local storage. This means:
- Your tasks persist even after closing the browser
- No account needed
- No data sent to any server
- Only your device stores the data

**Clear data**: Open browser DevTools (F12) → Application → Local Storage → Remove `studytrack_tasks`

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
--primary-color: #6366f1;      /* Main color */
--secondary-color: #10b981;    /* Success/complete color */
--danger-color: #ef4444;       /* Delete/overdue color */
--warning-color: #f59e0b;      /* Warning/pending color */
```

### Modify Text
Search and replace in `index.html` and `script.js` for any custom text.

## 📱 Responsive Features

The app automatically adapts to different screen sizes:
- **Desktop**: Full featured layout
- **Tablet**: Optimized grid layout
- **Mobile**: Single column, easy to tap buttons

## 🚀 Future Enhancements

- [ ] Convert to React for better state management
- [ ] Add categories/subjects for tasks
- [ ] Implement due date reminders
- [ ] Add task editing functionality
- [ ] Create productivity charts and graphs
- [ ] Add recurring tasks
- [ ] Enable cloud backup
- [ ] Add shortcuts and keyboard commands

## 💡 Tips for Best Results

1. **Set realistic deadlines** - Give yourself enough time
2. **Use priority wisely** - Mark truly urgent tasks as high priority
3. **Check regularly** - Review your tasks daily
4. **Celebrate completions** - Feel the satisfaction of checking tasks off!
5. **Organize by subject** - Use descriptions to note the subject

## 🐛 Troubleshooting

**Tasks disappeared?**
- Check if you cleared your browser cache
- Open DevTools to verify data in Local Storage

**Dark mode not working?**
- Clear browser cache and refresh
- Check if JavaScript is enabled

**Deadline not showing correctly?**
- Ensure your system timezone is correct
- Try in a different browser

## 📄 License

Free to use and modify for personal and educational purposes.

## 🎓 Perfect For

- High school students
- College students
- Online learners
- Anyone managing multiple deadlines

---

**Start tracking your productivity today! 🎯**

*Last updated: March 2, 2026*
