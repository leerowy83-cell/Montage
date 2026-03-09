export const MOCK_CHATS = [
  { id: 1, name: 'Alice Smith', lastMessage: 'See you at 5!', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=alice', unread: 2, online: true },
  { id: 2, name: 'Dev Team', lastMessage: 'Deployment successful 🚀', time: '9:30 AM', avatar: 'https://i.pravatar.cc/150?u=dev', unread: 0, online: false },
  { id: 3, name: 'Mom', lastMessage: 'Call me when you are free', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=mom', unread: 0, online: true },
  { id: 4, name: 'John Doe', lastMessage: 'Did you see the news?', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=john', unread: 5, online: false }
];

export const MOCK_MESSAGES = [
  { id: 101, chatId: 1, text: 'Hey, are we still meeting?', sender: 'Alice Smith', timestamp: '10:40 AM', isMe: false },
  { id: 102, chatId: 1, text: 'Yes! I am on my way.', sender: 'Me', timestamp: '10:42 AM', isMe: true },
  { id: 103, chatId: 1, text: 'See you at 5!', sender: 'Alice Smith', timestamp: '10:45 AM', isMe: false }
];