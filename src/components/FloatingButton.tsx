export type Interrupt = {
  id: number;
  text: string;
};

type FloatingButtonProps = {
  interruptionsCount: number;
  onClick: () => void;
};

export function FloatingButton({ interruptionsCount, onClick }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={onClick}
        className="relative bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl font-light shadow-lg hover:bg-red-700 transition-transform transform hover:scale-110"
        aria-label="Add new interruption"
      >
        +
        {interruptionsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-red-600">
            {interruptionsCount}
          </span>
        )}
      </button>
    </div>
  );
}
