export const createStore = (initialState) => {
  let state = initialState;
  const listeners = [];
  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(l => l(state));
    },
    subscribe: (l) => listeners.push(l)
  };
};
export const appStore = createStore({ activeChat: null, chats: [], messages: [], user: { name: 'John Doe', status: 'Available' } });