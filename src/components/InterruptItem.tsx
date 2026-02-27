import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Interrupt } from '../App';

type InterruptItemProps = {
  interrupt: Interrupt;
  onMove: (id: number) => void;
  onDelete: (id: number) => void;
};

export function InterruptItem({ interrupt, onMove, onDelete }: InterruptItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: interrupt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-amber-50 p-3 rounded-lg shadow-sm border border-amber-200"
    >
      <span
        {...attributes}
        className="p-2 mr-1 text-gray-400 cursor-grab touch-none"
        aria-label="Drag to reorder"
      >
        ⋮⋮
      </span>
      <span
        {...listeners}
        className="w-full text-gray-800 cursor-grab"
      >
        {interrupt.text}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onMove(interrupt.id)}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          aria-label={`Move interruption to main task list: ${interrupt.text}`}
        >
          Move to main
        </button>
        <button
          onClick={() => onDelete(interrupt.id)}
          className="text-gray-400 hover:text-red-500 font-bold"
          aria-label={`Delete interruption: ${interrupt.text}`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
