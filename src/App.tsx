import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { TaskItem } from './components/TaskItem';
import { FloatingButton } from './components/FloatingButton';
import { InterruptModal } from './components/InterruptModal';
import { InterruptItem } from './components/InterruptItem';

// --- Type Definitions ---
export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type Interrupt = {
  id: number;
  text: string;
};


const EmptyStateTasks = () => (
  <li className="text-center text-gray-400 py-8 px-4 border-2 border-dashed rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by adding a new task above.</p>
  </li>
);

const EmptyStateCompleted = () => (
  <li className="text-center text-gray-400 py-8 px-4 border-2 border-dashed rounded-lg">
     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No completed tasks</h3>
    <p className="mt-1 text-sm text-gray-500">Completed tasks will appear here.</p>
  </li>
);

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

  // --- dnd-kit sensor setup ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Effects for persistence
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('interruptions', JSON.stringify(interruptions));
  }, [interruptions]);

  // --- Drag and Drop Handlers (dnd-kit) ---
  function handleTaskDragEnd(event: any) {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  
  function handleInterruptDragEnd(event: any) {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setInterruptions((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // --- Task Handlers ---
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newTaskText.trim();
    if (text === '') return;
    setTasks(prev => [{ id: Date.now(), text, completed: false }, ...prev]);
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
    const interruptToMove = interruptions.find(i => i.id === id);
    if (!interruptToMove) return;

    const newTask: Task = {
      id: Date.now(),
      text: interruptToMove.text,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setInterruptions(prevInterrupts => prevInterrupts.filter(i => i.id !== id));
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTaskIds = incompleteTasks.map(t => t.id);
  const interruptionIds = interruptions.map(i => i.id);

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

          <div className="flex flex-col items-center mb-4">
            <p className="text-sm text-gray-500 mb-2">Something got in your way? Add it as an interruption to deal with later.</p>
            <FloatingButton
              interruptionsCount={interruptions.length}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Interruptions List */}
          {interruptions.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-amber-700">Incoming Interruptions</h2>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleInterruptDragEnd}
              >
                <SortableContext 
                  items={interruptionIds}
                  strategy={verticalListSortingStrategy}
                >
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
                </SortableContext>
              </DndContext>
            </section>
          )}

          {/* Main Task List */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Tasks</h2>
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleTaskDragEnd}
            >
              <SortableContext 
                items={incompleteTaskIds}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-3">
                  {incompleteTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      onToggleCompletion={toggleTaskCompletion}
                      onDelete={deleteTask}
                    />
                  ))}
                  {incompleteTasks.length === 0 && <EmptyStateTasks />}
                </ul>
              </SortableContext>
            </DndContext>
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
              {completedTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onToggleCompletion={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              ))}
              {completedTasks.length === 0 && <EmptyStateCompleted />}
            </ul>
          </section>

        </main>
      </div>

      
      <InterruptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addInterrupt}
      />
    </div>
  );
}

export default App;
