import { Avatar } from '../components/Avatar.js';
import { StatusIndicator } from '../components/StatusIndicator.js';
import { IconButton } from '../components/IconButton.js';
import { ICON_CLASSES } from '../constants/icons.js';

export const ChatHeader = (contact) => `
  <header class="header">
    <div class="header-info">
      <button class="btn-ghost back-btn" onclick="window.app.goBack()">
        <i class="${ICON_CLASSES.back}"></i>
      </button>
      ${Avatar(contact.avatar, 44)}
      <div>
        <div style="font-weight: 600; font-size: 16px;">${contact.name}</div>
        ${StatusIndicator(contact.online)}
      </div>
    </div>
    <div style="display: flex; gap: 4px;">
      ${IconButton(ICON_CLASSES.phone)}
      ${IconButton(ICON_CLASSES.video)}
      ${IconButton(ICON_CLASSES.more)}
    </div>
  </header>
`;