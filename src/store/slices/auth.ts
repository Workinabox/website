import { createSlice } from '@reduxjs/toolkit';

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'error';
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
