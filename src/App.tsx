import { useState, useEffect } from 'react';
import { TaskItem } from './components/TaskItem';
import { FloatingButton } from './components/FloatingButton';
import { InterruptModal } from './components/InterruptModal';
import { type Interrupt } from './components/FloatingButton';
import { InterruptItem } from './components/InterruptItem';


// Define the shape of a single task
export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // State for main tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse tasks", e);
      return [];
    }
  });

  // State for interruptions
  const [interruptions, setInterruptions] = useState<Interrupt[]>(() => {
    try {
      const saved = localStorage.getItem('interruptions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse interruptions", e);
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  // Effects for persistence
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('interruptions', JSON.stringify(interruptions));
  }, [interruptions]);

  // --- Task Handlers ---
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newTaskText.trim();
    if (text === '') return;
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  // --- Interruption Handlers ---
  const addInterrupt = (text: string) => {
    setInterruptions(prev => [...prev, { id: Date.now(), text }]);
  };

  const deleteInterrupt = (id: number) => {
    setInterruptions(interruptions.filter(i => i.id !== id));
  };

  const moveInterruptToMain = (id: number) => {
    // This functionality will be built in the next step
    console.log(`Moving task ${id} to main list (not implemented yet)`);
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen font-sans pt-8 bg-gray-50 pb-24">
      <div className="w-full max-w-2xl mx-auto px-4">

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Todo List</h1>
          <p className="text-gray-500">A simple tool to manage your daily tasks.</p>
        </header>

        <main>
          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
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

          {/* Interruptions List */}
          {interruptions.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-amber-700">Incoming Interruptions</h2>
              <ul className="space-y-3">
                {interruptions.map(interrupt => (
                  <InterruptItem
                    key={interrupt.id}
                    interrupt={interrupt}
                    onMove={moveInterruptToMain}
                    onDelete={deleteInterrupt}
                  />
                ))}
              </ul>
            </section>
          )}

          {/* Main Task List */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Tasks</h2>
            <ul className="space-y-3">
              {incompleteTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleCompletion={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              ))}
              {incompleteTasks.length === 0 && (
                <li className="text-center text-gray-400 py-4">
                  Your task list is empty.
                </li>
              )}
            </ul>
          </section>

          {/* Completed Task List */}
          <section>
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-2xl font-semibold">Completed</h2>
              {completedTasks.length > 0 && (
                <button
                  onClick={clearCompletedTasks}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear Completed
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleCompletion={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              ))}
              {completedTasks.length === 0 && (
                <li className="text-center text-gray-400 py-4">
                  No completed tasks yet.
                </li>
              )}
            </ul>
          </section>

        </main>
      </div>

      <FloatingButton 
        interruptionsCount={interruptions.length}
        onClick={() => setIsModalOpen(true)}
      />
      
      <InterruptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addInterrupt}
      />
    </div>
  );
}

export default App;
