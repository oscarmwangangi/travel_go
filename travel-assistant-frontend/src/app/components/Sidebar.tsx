import { FiX, FiPlus } from "react-icons/fi";
import { ChatHistory } from "./ChatHistory";

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  history: any[];
  currentChatId: string | null;
  onToggle: () => void;
  onNewChat: () => void;
  onLoadChat: (id: string) => void;
  onClearHistory: () => void;
}

export const Sidebar = ({
  isOpen,
  isMobileOpen,
  history,
  currentChatId,
  onToggle,
  onNewChat,
  onLoadChat,
  onClearHistory,
}: SidebarProps) => {
  return (
<div 
  className={`
    ${isOpen ? "w-64" : "w-0"} 
    fixed md:relative z-20 h-full bg-white shadow-lg
    overflow-hidden transition-all duration-300 ease-in-out flex flex-col
  `}
>
  <div className="p-4 h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onNewChat}
        className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <FiPlus className="mr-2" />
        New Chat
      </button>
      <button 
        onClick={onToggle}
        className="hidden md:block ml-2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
      >
        <FiX size={20} />
      </button>
    </div>

    <div className="border-b border-gray-200 mb-4"></div>

    <ChatHistory 
      history={history}
      currentChatId={currentChatId}
      onLoadChat={onLoadChat}
      onClearHistory={onClearHistory}
    />
  </div>
</div>

  );
};