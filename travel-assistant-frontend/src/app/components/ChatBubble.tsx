import { FiSearch } from "react-icons/fi";

interface ChatBubbleProps {
  type: 'user' | 'bot';
  content: string;
}

export const ChatBubble = ({ type, content }: ChatBubbleProps) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-4 rounded-xl ${type === 'user' 
          ? 'bg-blue-600 text-white rounded-br-none' 
          : 'bg-white text-gray-700 shadow-md rounded-bl-none border border-gray-200'}`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};