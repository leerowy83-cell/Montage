import { Sidebar } from '../pages/Sidebar.js';
import { ChatWindow } from '../pages/ChatWindow.js';
import { appStore } from '../state/appState.js';

export const renderApp = () => {
  const state = appStore.getState();
  const app = document.getElementById('app');
  app.innerHTML = `
    ${Sidebar(state.chats)}
    ${ChatWindow(state.activeChat, state.messages)}
  `;
};