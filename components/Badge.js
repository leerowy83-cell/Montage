export const Badge = (count) => count > 0 ? `
  <span style="background: var(--primary); color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: bold;">${count}</span>
` : '';