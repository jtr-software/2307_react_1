type PopupProps = {
  children: ReactNode;
  onClose: () => void;
};

export function Popup({ children, onClose }: PopupProps) {
  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    onClose();
  }

  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto relative scrollbar-hide"
        style={{ height: '90%' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
