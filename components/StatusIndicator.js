export const StatusIndicator = (isOnline) => `
  <div style="display: flex; align-items: center; gap: 6px;">
    <div class="status-dot" style="background: ${isOnline ? '#34C759' : '#C7C7CC'}"></div>
    <span class="status-text">${isOnline ? 'Active Now' : 'Offline'}</span>
  </div>
`;