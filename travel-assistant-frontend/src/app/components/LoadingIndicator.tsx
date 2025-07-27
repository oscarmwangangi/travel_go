export const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-4 bg-white rounded-xl shadow-md rounded-bl-none border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};