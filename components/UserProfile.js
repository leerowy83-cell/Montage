export const UserProfile = (user) => `
  <div class="user-profile" style="display: flex; align-items: center; gap: 10px;">
    <img src="${user.avatar}" style="width: 32px; height: 32px; border-radius: 50%;" />
    <span style="font-weight: 500;">${user.name}</span>
  </div>
`;