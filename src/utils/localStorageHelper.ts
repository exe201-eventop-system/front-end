
export const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  
  export const getFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  