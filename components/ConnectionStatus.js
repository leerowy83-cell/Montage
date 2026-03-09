export const ConnectionStatus = (isConnected) => `
  <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${isConnected ? 'var(--primary)' : 'var(--text-muted)'}">
    ${isConnected ? 'Connected' : 'Connecting...'}
  </div>
`;