// This file is kept as a placeholder.
// Cart functionality has been removed from the application.

import { createSlice } from '@reduxjs/toolkit';

// Simple notification slice to replace cart functionality
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    messages: []
  },
  reducers: {
    addNotification: (state, action) => {
      state.messages.push(action.payload);
    },
    clearNotifications: (state) => {
      state.messages = [];
    }
  }
});

export const { addNotification, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
