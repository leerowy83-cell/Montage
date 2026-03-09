import { Avatar } from './Avatar.js';
export const ChatItem = (chat) => `
  <div class="chat-item" onclick="window.app.selectChat(${chat.id})" style="display: flex; padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f2f2f2; align-items: center;">
    ${Avatar(chat.avatar)}
    <div style="flex: 1; margin-left: 15px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="font-weight: 500;">${chat.name}</span>
        <span style="font-size: 12px; color: #667781;">${chat.time}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
        <span style="font-size: 14px; color: #667781; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">${chat.lastMessage}</span>
        ${chat.unread > 0 ? `<span class="badge">${chat.unread}</span>` : ''}
      </div>
    </div>
  </div>
`;