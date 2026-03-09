import { ChatItem } from '../components/ChatItem.js';
import { IconButton } from '../components/IconButton.js';
export const Sidebar = (chats) => `
  <div class="sidebar">
    <header class="sidebar-header">
      <img src="https://i.pravatar.cc/150?u=me" class="avatar" />
      <div>
        ${IconButton('fas fa-circle-notch')}
        ${IconButton('fas fa-comment-alt')}
        ${IconButton('fas fa-ellipsis-v')}
      </div>
    </header>
    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search" style="color: #667781; font-size: 14px;"></i>
        <input type="text" placeholder="Search or start new chat" />
      </div>
    </div>
    <div class="chat-list">
      ${chats.map(chat => ChatItem(chat)).join('')}
    </div>
  </div>
`;