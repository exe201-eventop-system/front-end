export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
export const decodeToken = (token: string): unknown | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload); // decode base64
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Không thể giải mã token:", error);
    return null;
  }
};
