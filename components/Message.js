export const Message = (msg) => `
  <div class="message-bubble ${msg.isMe ? 'message-sent' : 'message-received'}">
    ${msg.text}
    <span class="message-time">${msg.timestamp}</span>
  </div>
`;