export const MessageStatus = (status) => {
  const icons = {
    sent: 'fa-check',
    delivered: 'fa-check-double',
    read: 'fa-check-double'
  };
  const color = status === 'read' ? 'var(--primary)' : 'var(--text-muted)';
  return `<i class="fas ${icons[status]}" style="font-size: 10px; color: ${color}; margin-left: 4px;"></i>`;
};