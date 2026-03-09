import { ICON_CLASSES } from '../constants/icons.js';
import { IconButton } from '../components/IconButton.js';

export const ChatInput = () => `
  <form class="input-footer" onsubmit="window.app.handleSend(event)">
    ${IconButton(ICON_CLASSES.smile)}
    ${IconButton(ICON_CLASSES.attach)}
    <div class="input-wrapper">
      <input type="text" id="messageInput" placeholder="Type a message..." autocomplete="off" />
    </div>
    <button type="submit" class="btn-round">
      <i class="${ICON_CLASSES.send}"></i>
    </button>
  </form>
`;