import { ChatHeader } from '../components/ChatHeader.js';
import { MessageList } from '../components/MessageList.js';
import { ChatInput } from '../components/ChatInput.js';
import { Loader } from '../components/Loader.js';

export const ChatPage = (state) => {
  if (state.isLoading) return Loader();
  
  return `
    <div class="animate-slide-in" style="display: flex; flex-direction: column; height: 100%;">
      ${ChatHeader(state.activeContact)}
      ${MessageList(state.messages)}
      ${ChatInput()}
    </div>
  `;
};