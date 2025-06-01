import { Message, User } from '../types';

type MessageListProps = {
  messages: Message[];
  currentUser: User;
};

export default function MessageList({ messages, currentUser }: MessageListProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.sender === currentUser.name ? 'flex-row-reverse' : ''}`}>
            <img 
              src={message.avatar} 
              alt={message.sender}
              className="mx-2 mt-1 rounded-full w-8 h-8"
            />
            <div>
              <div
                className={`rounded-2xl px-4 py-2 ${message.sender === currentUser.name 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                {message.sender !== currentUser.name && (
                  <div className="mb-1 font-semibold text-xs">
                    {message.sender}
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
              </div>
              <div className={`text-xs text-gray-500 mt-1 flex items-center ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}>
                <span>{formatTime(message.timestamp)}</span>
                {message.sender === currentUser.name && (
                  <span className="ml-1">
                    {message.status === 'read' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                      </svg>
                    ) : message.status === 'delivered' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}