import { useState } from 'react';
import type { Task } from '../App';

type TaskItemProps = {
  task: Task;
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart?: (id: number) => void;
  onDrop?: (id: number) => void;
};

export function TaskItem({ task, onToggleCompletion, onDelete, onDragStart, onDrop }: TaskItemProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Draggability is only enabled for incomplete tasks
  const isDraggable = !task.completed && onDragStart && onDrop;

  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    if (!isDraggable) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(task.id));
    onDragStart?.(task.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    if (!isDraggable) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    if (!isDraggable) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    if (!isDraggable) return;
    e.preventDefault();
    setIsDragOver(false);
    onDrop?.(task.id);
  };

  return (
    <li
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex items-center bg-white p-3 rounded-lg shadow-sm transition-all duration-150
        ${task.completed ? 'opacity-50' : ''}
        ${isDragOver ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      {isDraggable && (
        <span
          draggable={true}
          onDragStart={handleDragStart}
          className="p-2 mr-1 text-gray-400 cursor-grab select-none"
          aria-label="Drag to reorder"
        >
          ⋮⋮
        </span>
      )}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompletion(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
      />
      <span
        draggable={isDraggable}
        onDragStart={handleDragStart}
        className={`w-full text-gray-800 ${task.completed ? 'line-through' : ''} ${isDraggable ? 'cursor-grab select-none' : ''}`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-4 text-gray-400 hover:text-red-500 font-bold"
        aria-label={`Delete task: ${task.text}`}
      >
        ✕
      </button>
    </li>
  );
}
