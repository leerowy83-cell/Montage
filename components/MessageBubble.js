export const MessageBubble = (msg) => `
  <div class="msg-row ${msg.isMe ? 'me' : 'them'}">
    <div class="msg-container">
      <div class="msg-bubble">${msg.text}</div>
      <div class="msg-meta" style="${msg.isMe ? 'text-align: right' : ''}">${msg.timestamp}</div>
    </div>
  </div>
`;