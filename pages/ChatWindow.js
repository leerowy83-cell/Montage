import { Message } from '../components/Message.js';
import { IconButton } from '../components/IconButton.js';

export const ChatWindow = (chat, messages) => {
  if (!chat) return `
    <div class="chat-window" style="justify-content: center; align-items: center; color: #667781; text-align: center; padding: 20px;">
      <img src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa699aeD6pV.png" style="width: 250px; max-width: 80%; opacity: 0.5;" />
      <h1 style="font-weight: 300; margin-top: 20px; font-size: 24px;">WhatsApp Web</h1>
      <p style="font-size: 14px;">Send and receive messages without keeping your phone online.</p>
    </div>`;
  
  return `
  <div class="chat-window">
    <header class="chat-header">
      <div class="back-btn">
        ${IconButton('fas fa-arrow-left', 'onclick="window.app.closeChat()"')}
      </div>
      <img src="${chat.avatar}" class="avatar" />
      <div style="margin-left: 15px; flex: 1; overflow: hidden;">
        <div style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${chat.name}</div>
        <div style="font-size: 12px; color: #667781;">${chat.online ? 'online' : 'last seen recently'}</div>
      </div>
      <div style="display: flex;">
        ${IconButton('fas fa-search')}
        ${IconButton('fas fa-paperclip')}
        ${IconButton('fas fa-ellipsis-v')}
      </div>
    </header>
    <div class="chat-messages" id="chatMessages">
      ${messages.map(m => Message(m)).join('')}
    </div>
    <form class="chat-input-area" onsubmit="window.app.sendMessage(event)">
      ${IconButton('far fa-smile')}
      <input type="text" id="msgInput" placeholder="Type a message" autocomplete="off" />
      ${IconButton('fas fa-microphone')}
    </form>
  </div>`;
};