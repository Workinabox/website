import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  requestAccessModalOpen: boolean;
}

const initialState: UiState = {
  requestAccessModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openRequestAccessModal(state) {
      state.requestAccessModalOpen = true;
    },
    closeRequestAccessModal(state) {
      state.requestAccessModalOpen = false;
    },
  },
});

export const { openRequestAccessModal, closeRequestAccessModal } = uiSlice.actions;
export default uiSlice.reducer;
