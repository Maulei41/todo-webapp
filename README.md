# Simple Todo App with Interrupt Buffer

This is a simple but thoughtful todo application built with React, TypeScript, and Vite, featuring a unique custom tool designed for professionals who need to manage frequent interruptions. The project was created as part of the Oursky Product Manager pre-test.

## Core Features

- **Add, Complete, Delete Tasks**: Standard todo list functionality.
- **Persistent Storage**: All tasks and interruptions are saved to `localStorage`, so your data survives a page refresh.
- **Drag-and-Drop Reordering**: Both main tasks and interruptions can be re-prioritized using a smooth drag-and-drop interface, powered by `dnd-kit`.
- **Visual Priority Hint**: A subtle gradient on the main task list provides a visual cue that tasks at the top have a higher priority.
- **Clear Completed**: A simple button to clean up your completed tasks.
- **Responsive Design**: The app is designed to be usable on both desktop and mobile devices.

## The Custom Feature: Interrupt Buffer

As a product manager, my day is often fragmented by client requests, urgent questions, and other small but important pings. These break my focus and can be hard to track. The **Interrupt Buffer** is designed to solve this.

### How It Works:

1.  **Quick Capture**: A floating red "+" button is always visible. Clicking it opens a small modal.
2.  **Log the Interruption**: Type a quick note (e.g., "Client A asked for the latest mockups") and save it. The capture process is designed to take less than 5 seconds.
3.  **Triage Later**: The interruption is added to a separate "Incoming Interruptions" list. The floating button shows a badge with the number of pending items.
4.  **Promote to Task**: During a break or a planning session, you can review the interruptions. If an item requires significant work, click the "Move to main" button to add it to your primary task list for proper prioritization.
5.  **Delete as Needed**: If an interruption was just a quick note that has been handled, you can delete it directly.

This system keeps the main task list clean and focused on planned work, while ensuring that unexpected but important items are never lost.

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Drag & Drop**: `dnd-kit` for a smooth and reliable experience.
- **Persistence**: `localStorage`

## Getting Started

To run this project locally:

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd todo-webapp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

This will start the application, and you can open it in your browser at the local address provided (usually `http://localhost:5173`).
