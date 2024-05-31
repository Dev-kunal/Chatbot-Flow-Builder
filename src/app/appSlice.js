import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appState",
  initialState: {
    selectedNode: null,
    messageForSelectedNode: "test message",
    error: false,
    showSettings: false,
  },
  reducers: {
    setShowSettings: (state, action) => {
      state.showSettings = action.payload.value;
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload.node;
    },
    setMessageForSelectedNode: (state, action) => {
      state.messageForSelectedNode = action.payload.message;
    },
    setError: (state, action) => {
      state.error = action.payload.value;
    },
  },
});

export const {
  setSelectedNode,
  setMessageForSelectedNode,
  setError,
  setShowSettings,
} = appSlice.actions;

export default appSlice.reducer;
