export const Avatar = (src, size = 40) => `
  <img src="${src}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover;" alt="user" />
`;