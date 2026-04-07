import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { clearAuthFromSessionStorage, loadAuthFromSessionStorage, saveAuthToSessionStorage } from './authStorage';

const preloadedAuth = loadAuthFromSessionStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
});

let lastAuth = store.getState().auth;

store.subscribe(() => {
  const nextAuth = store.getState().auth;
  if (nextAuth === lastAuth) return;
  lastAuth = nextAuth;
  if (!nextAuth.user) {
    clearAuthFromSessionStorage();
    return;
  }
  saveAuthToSessionStorage(nextAuth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

