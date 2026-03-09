export const MOCK_USER = {
  id: 'me',
  name: 'Alex Rivera',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  status: 'Productive'
};

export const MOCK_CONTACT = {
  id: 1,
  name: 'Sarah Jenkins',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  online: true,
  role: 'Senior Designer'
};

export const MOCK_MESSAGES = [
  { id: 1, text: 'Hi Alex, did you review the latest mocks?', sender: 'Sarah Jenkins', timestamp: '10:00 AM', isMe: false },
  { id: 2, text: 'Hey Sarah! Just looking at them now. The typography looks much cleaner.', sender: 'Me', timestamp: '10:05 AM', isMe: true },
  { id: 3, text: 'Glad you like it! I adjusted the spacing on the dashboard too.', sender: 'Sarah Jenkins', timestamp: '10:06 AM', isMe: false },
  { id: 4, text: 'Perfect. Let\'s sync at 2 PM to finalize.', sender: 'Me', timestamp: '10:10 AM', isMe: true }
];