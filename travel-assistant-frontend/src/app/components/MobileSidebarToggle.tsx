import { FiX, FiMenu } from "react-icons/fi";

interface MobileSidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileSidebarToggle = ({ isOpen, onToggle }: MobileSidebarToggleProps) => {
  return (
    <button 
      className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-blue-600 text-white shadow-md"
      onClick={onToggle}
    >
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );
};