import { MOCK_CHATS, MOCK_MESSAGES } from '../constants/mockData.js';
export const chatService = {
  getChats: () => Promise.resolve(MOCK_CHATS),
  getMessages: (chatId) => Promise.resolve(MOCK_MESSAGES.filter(m => m.chatId === chatId))
};