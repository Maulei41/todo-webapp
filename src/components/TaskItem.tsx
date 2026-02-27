import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../App';

type TaskItemProps = {
  task: Task;
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({ task, onToggleCompletion, onDelete }: TaskItemProps) {
  const isDraggable = !task.completed;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center bg-white p-3 rounded-lg shadow-sm
        ${task.completed ? 'opacity-50' : ''}
      `}
    >
      {isDraggable && (
        // The handle is for accessibility and attributes
        <span
          {...attributes}
          className="p-2 mr-1 text-gray-400 cursor-grab touch-none"
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
        {...(isDraggable ? listeners : {})} 
        className={`w-full text-gray-800 ${task.completed ? 'line-through' : ''} ${isDraggable ? 'cursor-grab' : ''}`}
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
