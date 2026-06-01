import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: User | null;
  /** False until the first Firebase auth state resolves (used to avoid a gate flash). */
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.initialized = true;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
