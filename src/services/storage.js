// storage.js - simple wrappers for localStorage with JSON handling
export const saveToLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to localStorage', key, e);
  }
};

export const getFromLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse localStorage', key, e);
    return fallback;
  }
};
