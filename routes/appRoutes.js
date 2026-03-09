import { ChatPage } from '../pages/ChatPage.js';
import { appStore } from '../state/appState.js';

export const renderApp = () => {
  const state = appStore.getState();
  const app = document.getElementById('app');
  app.innerHTML = ChatPage(state);
  
  // Auto-scroll
  const list = document.getElementById('messageList');
  if (list) list.scrollTop = list.scrollHeight;
};