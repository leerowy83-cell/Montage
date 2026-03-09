import { MessageBubble } from '../components/MessageBubble.js';

export const MessageList = (messages) => `
  <div class="chat-area" id="messageList">
    ${messages.length > 0 
      ? messages.map(m => MessageBubble(m)).join('') 
      : '<div style="text-align: center; color: var(--text-muted); margin-top: 40px;">No messages yet. Say hi!</div>'}
  </div>
`;