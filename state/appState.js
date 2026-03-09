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

export const appStore = createStore({ 
    activeContact: null,
    messages: [], 
    currentUser: null,
    isLoading: true,
    view: 'chat' // 'list' or 'chat' for mobile transitions
});