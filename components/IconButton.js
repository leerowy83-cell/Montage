export const IconButton = (icon, onClick = '', className = 'btn-ghost') => `
  <button class="${className}" onclick="${onClick}">
    <i class="${icon}"></i>
  </button>
`;