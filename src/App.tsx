import { useState, useEffect } from 'react';

// Define the shape of a single task
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // State to hold the list of all tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  // Effect to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks into incomplete and completed lists for rendering
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen font-sans flex flex-col items-center pt-8 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto px-4">

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Todo List</h1>
          <p className="text-gray-500">A simple tool to manage your daily tasks.</p>
        </header>

        <main>
          {/* Add Task Form */}
          <form className="flex gap-2 mb-8">
            <input
              type="text"
              placeholder="Add a new task..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>

          {/* Main Task List */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Tasks</h2>
            <ul className="space-y-3">
              {/* Task items will go here */}
              {incompleteTasks.length === 0 && (
                <li className="text-center text-gray-400 py-4">
                  Your task list is empty.
                </li>
              )}
            </ul>
          </section>

          {/* Completed Task List */}
          <section>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Completed</h2>
            <ul className="space-y-3">
              {/* Completed items will go here */}
              {completedTasks.length === 0 && (
                <li className="text-center text-gray-400 py-4">
                  No completed tasks yet.
                </li>
              )}
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;
