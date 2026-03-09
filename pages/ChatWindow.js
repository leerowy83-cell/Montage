import { Message } from '../components/Message.js';
import { IconButton } from '../components/IconButton.js';

export const ChatWindow = (chat, messages) => {
  if (!chat) return `
    <div class="chat-window" style="justify-content: center; align-items: center; color: #667781;">
      <img src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa699aeD6pV.png" style="width: 300px; opacity: 0.5;" />
      <h1 style="font-weight: 300; margin-top: 20px;">WhatsApp Web</h1>
      <p>Send and receive messages without keeping your phone online.</p>
    </div>`;
  
  return `
  <div class="chat-window">
    <header class="chat-header">
      <img src="${chat.avatar}" class="avatar" />
      <div style="margin-left: 15px; flex: 1;">
        <div style="font-weight: 500;">${chat.name}</div>
        <div style="font-size: 13px; color: #667781;">${chat.online ? 'online' : 'last seen recently'}</div>
      </div>
      <div>
        ${IconButton('fas fa-search')}
        ${IconButton('fas fa-paperclip')}
        ${IconButton('fas fa-ellipsis-v')}
      </div>
    </header>
    <div class="chat-messages">
      ${messages.map(m => Message(m)).join('')}
    </div>
    <form class="chat-input-area" onsubmit="window.app.sendMessage(event)">
      ${IconButton('far fa-smile')}
      <input id="msgInput" type="text" placeholder="Type a message" autocomplete="off" />
      ${IconButton('fas fa-microphone')}
    </form>
  </div>`;
};