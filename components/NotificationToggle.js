export const NotificationToggle = (isOn) => `
  <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
    <i class="fas ${isOn ? 'fa-bell' : 'fa-bell-slash'}" style="color: var(--text-muted);"></i>
  </div>
`;