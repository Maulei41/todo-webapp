import { useState } from 'react';

type InterruptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
};

export function InterruptModal({ isOpen, onClose, onSave }: InterruptModalProps) {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(text.trim());
      setText('');
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h3 className="text-xl font-semibold mb-4">Quick Capture</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Capture a client ping or a stray thought..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
