import { getFromLS, saveToLS } from './storage';

const LS_KEY = 'wms_users_v1';

export const loadUsers = () => getFromLS(LS_KEY, [
  { username: 'admin', password: 'pakistan' }
]);

export const saveUsers = (users) => saveToLS(LS_KEY, users);

export const addUser = (users, user) => {
  if (users.some(u => u.username === user.username)) return users;
  const next = [...users, user];
  saveUsers(next);
  return next;
};

export const removeUser = (users, username) => {
  const next = users.filter(u => u.username !== username);
  saveUsers(next);
  return next;
};
