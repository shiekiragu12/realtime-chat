import { User } from '../types';

type SidebarProps = {
  users: User[];
  currentUser: User;
  isOpen: boolean;
  onToggle: () => void;
};

export default function Sidebar({ users, currentUser, isOpen, onToggle }: SidebarProps) {
  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-white border-r 
      border-gray-200 z-30 transition-transform duration-300 ease-in-out
      flex flex-col`}>
      
      <div className="flex justify-between items-center p-4 border-gray-200 border-b">
        <h2 className="font-semibold text-lg">Chats</h2>
        <button 
          onClick={onToggle}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {users.map((user) => (
          <div key={user.id} className="flex items-center hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
            <div className="relative mr-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="rounded-full w-10 h-10"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500 text-xs">
                {user.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-gray-200 border-t">
        <div className="flex items-center">
          <div className="relative mr-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="rounded-full w-10 h-10"
            />
            <span className="right-0 bottom-0 absolute bg-green-500 border-2 border-white rounded-full w-3 h-3"></span>
          </div>
          <div>
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-gray-500 text-xs">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}