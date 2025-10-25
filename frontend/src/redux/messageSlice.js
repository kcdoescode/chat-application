import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    // Replace the whole array (used when fetching conversation history)
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // Append a single real-time message 
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // clear messages when chat is closed
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
