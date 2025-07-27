import { FiClock, FiMessageSquare, FiX, FiSearch } from "react-icons/fi";

interface ChatHistoryItem {
  id?: string;
  question: string;
  answer: string;
  timestamp?: Date;
}

interface ChatHistoryProps {
  history: ChatHistoryItem[];
  currentChatId: string | null;
  onLoadChat: (id: string) => void;
  onClearHistory: () => void;
}

export const ChatHistory = ({ 
  history, 
  currentChatId, 
  onLoadChat, 
  onClearHistory 
}: ChatHistoryProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          <FiClock className="mr-2" /> Recent Chats
        </h2>
      </div>

      {history.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto">
            {history.map((item) => (
              <div 
                key={item.id} 
                className={`mb-2 p-3 rounded-lg cursor-pointer transition-colors ${currentChatId === item.id ? 'bg-blue-100 border border-blue-200' : 'hover:bg-gray-50 border border-gray-100'}`}
                onClick={() => item.id && onLoadChat(item.id)}
              >
                <p className="font-medium text-gray-800 truncate">
                  <FiSearch className="inline mr-2 text-blue-600" /> 
                  {item.question.substring(0, 50)}{item.question.length > 50 ? '...' : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Unknown date'}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onClearHistory}
            className="mt-4 text-sm text-red-500 hover:text-red-700 flex items-center justify-center py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
          >
            <FiX className="mr-1" /> Clear All Chats
          </button>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <FiMessageSquare className="mb-2 text-2xl" />
          <p>No chat history</p>
        </div>
      )}
    </>
  );
};