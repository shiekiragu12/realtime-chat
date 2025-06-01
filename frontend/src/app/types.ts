export type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
};

export type Message = {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
};