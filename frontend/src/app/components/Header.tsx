/* eslint-disable @next/next/no-img-element */
import { User } from '../types';

type HeaderProps = {
  currentUser: User;
  onMenuClick: () => void;
};

export default function Header({ currentUser, onMenuClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center bg-white p-4 border-gray-200 border-b">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="lg:hidden mr-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 text-xl">Realtime Chat</h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="hidden sm:block text-right">
          <p className="font-medium">{currentUser.name}</p>
          <p className="text-gray-500 text-xs">Online</p>
        </div>
        <div className="relative">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="border-2 border-indigo-500 rounded-full w-10 h-10"
          />
          <span className="right-0 bottom-0 absolute bg-green-500 border-2 border-white rounded-full w-3 h-3"></span>
        </div>
      </div>
    </header>
  );
}