import { Sidebar } from '../pages/Sidebar.js';
import { ChatWindow } from '../pages/ChatWindow.js';
import { appStore } from '../state/appState.js';

export const renderApp = () => {
  const state = appStore.getState();
  const app = document.getElementById('app');
  
  // Update body class for mobile view switching
  if (state.activeChat) {
    app.classList.add('chat-active');
  } else {
    app.classList.remove('chat-active');
  }

  app.innerHTML = `
    ${Sidebar(state.chats)}
    ${ChatWindow(state.activeChat, state.messages)}
  `;

  // Ensure scroll to bottom on render if chat is open
  const container = document.getElementById('chatMessages');
  if (container) container.scrollTop = container.scrollHeight;
};