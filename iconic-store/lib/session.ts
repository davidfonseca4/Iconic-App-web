const TOKEN_KEY = 'iconic_token';
const AUTH_EVENT = 'iconic-auth-changed';

const notifyAuthChanged = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const hasAuthToken = (): boolean => Boolean(getAuthToken());

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChanged();
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  notifyAuthChanged();
};

export { TOKEN_KEY };
export { AUTH_EVENT };
