export const AttachmentPreview = (file) => `
  <div class="attachment-preview" style="padding: 10px; background: var(--bg-app); border-radius: 8px; display: flex; align-items: center; gap: 10px;">
    <i class="fas fa-file-pdf" style="color: #FF3B30;"></i>
    <span style="font-size: 13px;">${file.name}</span>
  </div>
`;