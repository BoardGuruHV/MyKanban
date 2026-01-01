# MyKanban - Feature Development Matrix

A Kanban-style project management application for tracking feature development across multiple projects.

## Features

- **Drag & Drop Kanban Boards** - Manage features across Backlog, In Progress, and Done columns
- **Multi-Project Support** - Track 9 projects: SpecSpot, jyotish, TutoringSid, BiotechIC, oppspot, appboardguru2, bharatiyam, aiborg_CC, beentheredonethat
- **Unified Dashboard** - View all projects at a glance with progress visualization
- **Project-Specific Boards** - Dedicated board for each project
- **localStorage Persistence** - All data saved automatically in browser
- **Copy Prompts** - One-click copy of feature prompts for AI coding agents
- **Progress Tracking** - Visual progress bars and statistics per project

## Usage

### Opening the App

Simply open `index.html` in your web browser:

```bash
# Using default browser
xdg-open /home/vik/MyKanban/index.html

# Or with a specific browser
google-chrome /home/vik/MyKanban/index.html
firefox /home/vik/MyKanban/index.html
```

### Navigation

- **Dashboard Tab** - Overview of all projects with mini Kanban boards
- **Project Tabs** - Individual Kanban boards for each project
- **Add Feature** - Click to create new feature requests
- **Copy Prompt** - Click to copy feature prompt for pasting into coding agent
- **Drag Features** - Drag cards between columns to update status

### Feature Management

1. **Create Feature**
   - Click "Add Feature" button
   - Fill in feature name and prompt
   - Feature appears in Backlog for all projects

2. **Track Progress**
   - Drag feature cards between columns: Backlog → In Progress → Done
   - Each project tracks status independently
   - Progress bars update automatically

3. **Copy Prompts**
   - Click "Copy Prompt" button on any feature card
   - Paste into your AI coding agent
   - Reuse same prompt across multiple projects

4. **Delete Features**
   - Click "Delete" button on feature card
   - Removes feature from all projects

## Data Storage

All data is stored in browser's localStorage:
- **Key**: `kanban-feature-status`
- **Format**: JSON object mapping features to project statuses
- **Persistence**: Data survives browser restarts
- **Privacy**: Data stays local on your machine

## Technical Details

- **Technology**: Vanilla HTML, CSS, JavaScript
- **Dependencies**: None (single self-contained file)
- **Browser Support**: Modern browsers with localStorage and drag-and-drop API
- **File Size**: ~37KB

## Tips

- Use descriptive feature names for easy identification
- Write detailed prompts that can be reused across projects
- Check Dashboard regularly to see overall progress
- Features marked "Done" in all projects turn green in Dashboard

## File Structure

```
MyKanban/
├── index.html          # Main application (self-contained)
└── README.md          # This file
```

## Created

Generated with Claude Code for multi-project feature development management.
