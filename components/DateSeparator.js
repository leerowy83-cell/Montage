export const DateSeparator = (date) => `
  <div style="display: flex; align-items: center; margin: 20px 0;">
    <div style="flex: 1; height: 1px; background: var(--border);"></div>
    <span style="padding: 0 15px; font-size: 12px; color: var(--text-muted);">${date}</span>
    <div style="flex: 1; height: 1px; background: var(--border);"></div>
  </div>
`;