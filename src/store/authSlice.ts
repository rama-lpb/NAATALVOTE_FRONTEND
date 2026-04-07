import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserRole } from '../data/mockData';

export type AuthUser = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  roles: UserRole[];
};

export type AuthState = {
  user: AuthUser | null;
  currentRole: UserRole | null;
};

const initialState: AuthState = {
  user: null,
  currentRole: null,
};

type SetSessionPayload = {
  user: AuthUser;
  currentRole?: UserRole;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SetSessionPayload>) {
      state.user = action.payload.user;
      state.currentRole = action.payload.currentRole ?? action.payload.user.roles[0] ?? null;
    },
    setCurrentRole(state, action: PayloadAction<UserRole>) {
      if (!state.user) return;
      if (!state.user.roles.includes(action.payload)) return;
      state.currentRole = action.payload;
    },
    logout(state) {
      state.user = null;
      state.currentRole = null;
    },
  },
});

export const { setSession, setCurrentRole, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

