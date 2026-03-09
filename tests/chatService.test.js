import { chatService } from '../services/chatService.js';
export const testChatService = async () => {
  const chats = await chatService.getChats();
  console.assert(chats.length > 0, 'Chats should be loaded');
  console.log('ChatService tests passed');
};