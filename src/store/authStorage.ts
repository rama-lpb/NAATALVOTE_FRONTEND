import type { AuthState } from './authSlice';

const AUTH_STORAGE_KEY = 'naatalvote.auth';

export function loadAuthFromSessionStorage(): AuthState | undefined {
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return undefined;
  }
}

export function saveAuthToSessionStorage(state: AuthState) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function clearAuthFromSessionStorage() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

