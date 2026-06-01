import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  authModalOpen: boolean;
}

const initialState: UiState = {
  authModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal(state) {
      state.authModalOpen = true;
    },
    closeAuthModal(state) {
      state.authModalOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal } = uiSlice.actions;
export default uiSlice.reducer;
