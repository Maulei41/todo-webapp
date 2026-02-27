
type FloatingButtonProps = {
  interruptionsCount: number;
  onClick: () => void;
};

export function FloatingButton({ interruptionsCount, onClick }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={onClick}
        className={`
          bg-red-600 text-white font-bold shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          hover:bg-red-700
          ${interruptionsCount > 0 ? 
            'rounded-full h-12 px-5' : 
            'rounded-full w-16 h-16 text-4xl'
          }
        `}
        aria-label="Add new interruption"
      >
        {interruptionsCount > 0 ? (
          <div className="flex items-center">
            <span className="text-2xl mr-3">+</span>
            <div className="w-px bg-red-400 self-stretch mx-1"></div>
            <span className="text-xl ml-3">{interruptionsCount}</span>
          </div>
        ) : (
          <span>+</span>
        )}
      </button>
    </div>
  );
}
