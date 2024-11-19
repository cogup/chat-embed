import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import __, { Index } from "../../../settings/i18n";
import * as api from "../handlers/api";
import { ActionType, EntityState, initialState } from "../../../core/entities";
import { Config } from "../interfaces";

export const startChat = createAsyncThunk(
  ActionType.CHAT_GET_CURRENT_OR_CREATE_CHAT,
  async () => {
    return await api.startChat();
  }
);

export type ChatEntityState = EntityState<Config>;

export const chatEntity = createSlice({
  name: "chatEntity",
  initialState: initialState<Config>(),
  reducers: {
    clearChatEntity: (state) => {
      state.loading = false;
      state.entity = null;
      state.entities = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action && action.payload) {
          state.entity = action.payload;
        }
      })
      .addCase(startChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? __(Index.CHAT_ERROR);
      });
  },
});

export const { clearChatEntity } = chatEntity.actions;

export const getChatEntity = (state: { aiHandler: ChatEntityState }) =>
  state.aiHandler.entity;
export const getChatEntities = (state: { aiHandler: ChatEntityState }) =>
  state.aiHandler.entities;
export const getChatLoading = (state: { aiHandler: ChatEntityState }) =>
  state.aiHandler.loading;
export const getChatError = (state: { aiHandler: ChatEntityState }) =>
  state.aiHandler.error;

export default chatEntity.reducer;
