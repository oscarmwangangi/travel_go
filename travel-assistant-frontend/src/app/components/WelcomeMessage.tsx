import { FiMessageSquare } from "react-icons/fi";

export const WelcomeMessage = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
        <FiMessageSquare size={32} className="text-blue-600" />
      </div>
      <h2 className="text-xl font-medium text-gray-700 mb-2">How can I help with your travel plans?</h2>
      <p className="text-gray-500">Ask about destinations, itineraries, or travel tips</p>
    </div>
  );
};