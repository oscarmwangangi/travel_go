import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  query: string;
  loading: boolean;
  onQueryChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ query, loading, onQueryChange, onSend }: ChatInputProps) => {
  return (
    <div className="relative">
      <textarea
        className="w-full border rounded-xl p-4 pr-12 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        rows={3}
        placeholder="Ask your travel question..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button
        className="absolute right-4 bottom-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
        onClick={onSend}
        disabled={loading || !query.trim()}
      >
        <FiSend size={20} />
      </button>
    </div>
  );
};