import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import __, { Index } from "../../../settings/i18n";
import * as api from "../handlers/api";
import { initialState, EntityState, ActionType } from "../../../core/entities";
import { Message, MessageOwners, MessageStatus } from "../interfaces";
import { v4 as uuid } from "uuid";

export const createMessage = createAsyncThunk(
  ActionType.MESSAGE_CREATE_MESSAGE,
  async (data: { message: string; referenceId?: string }) => {
    return await api.createMessage({
      message: data.message,
      referenceId: data.referenceId,
    });
  }
);

export const createLocalMessage = createAsyncThunk(
  ActionType.MESSAGE_LOCAL_CREATE_MESSAGE_AND_SYNC,
  async (message: string, { dispatch, rejectWithValue }) => {
    const referenceId = uuid();

    dispatch(createMessage({ message, referenceId }));

    const data: Message = {
      referenceId,
      message,
      status: MessageStatus.PENDING,
      owner: MessageOwners.USER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return data;
  }
);

export const listMessages = createAsyncThunk(
  ActionType.MESSAGE_LIST_MESSAGES,
  async () => {
    return await api.listMessages();
  }
);

export type MessageEntityState = EntityState<Message>;

export const aiEntity = createSlice({
  name: "chatEntity",
  initialState: initialState<Message>(),
  reducers: {
    clearMessageEntity: (state) => {
      state.loading = false;
      state.entity = null;
      state.entities = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.message;
        state.error = null;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? __(Index.CHAT_ERROR);
      })
      .addCase(listMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data;
        state.error = null;
      })
      .addCase(listMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? __(Index.CHAT_ERROR);
      })
      .addCase(createLocalMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocalMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = state.entities
          ? [...state.entities, action.payload]
          : [action.payload];
        state.error = null;
      })
      .addCase(createLocalMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? __(Index.CHAT_ERROR);
      });
  },
});

export const { clearMessageEntity } = aiEntity.actions;

export const getMessageEntity = (state: { aiHandler: MessageEntityState }) =>
  state.aiHandler.entity;
export const getMessageEntities = (state: { aiHandler: MessageEntityState }) =>
  state.aiHandler.entities;
export const getMessageLoading = (state: { aiHandler: MessageEntityState }) =>
  state.aiHandler.loading;
export const getMessageError = (state: { aiHandler: MessageEntityState }) =>
  state.aiHandler.error;

export default aiEntity.reducer;
