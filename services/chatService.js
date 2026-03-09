import { MOCK_MESSAGES, MOCK_CONTACT } from '../constants/mockData.js';
export const chatService = {
  getMessages: () => Promise.resolve([...MOCK_MESSAGES]),
  getContact: () => Promise.resolve(MOCK_CONTACT),
  sendMessage: (text) => Promise.resolve({
    id: Date.now(),
    text,
    sender: 'Me',
    timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date()),
    isMe: true
  })
};