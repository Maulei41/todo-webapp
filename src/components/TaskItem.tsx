import type { Task } from '../App';

type TaskItemProps = {
  task: Task;
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({ task, onToggleCompletion, onDelete }: TaskItemProps) {
  return (
    <li
      className={`flex items-center bg-white p-3 rounded-lg shadow-sm transition-opacity ${
        task.completed ? 'opacity-50' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompletion(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
      />
      <span className={`flex-grow text-gray-800 ${task.completed ? 'line-through' : ''}`}>
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
