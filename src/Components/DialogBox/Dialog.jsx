
const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <dialog open={isOpen} className="rounded-lg p-6 shadow-lg border-none z-30">
      {children}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
