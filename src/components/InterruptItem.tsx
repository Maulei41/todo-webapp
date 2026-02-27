import type { Interrupt } from './FloatingButton';

type InterruptItemProps = {
  interrupt: Interrupt;
  onMove: (id: number) => void;
  onDelete: (id: number) => void;
};

export function InterruptItem({ interrupt, onMove, onDelete }: InterruptItemProps) {
  return (
    <li className="flex items-center bg-amber-50 p-3 rounded-lg shadow-sm border border-amber-200">
      <span className="flex-grow text-gray-800">{interrupt.text}</span>
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
