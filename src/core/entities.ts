import { Meta } from "./interfaces";

export interface EntityState<T> {
  entity: T | null;
  entities: T[] | null;
  loading: boolean;
  error: string | null;
  meta?: Meta;
}

export interface EntityStateSearch<T> {
  entity: T | null;
  entities: T[] | null;
  nextToken: string | null;
  loading: boolean;
  error: string | null;
}

export const initialStateSearch = <T>(): EntityStateSearch<T> => {
  return {
    entity: null,
    entities: null,
    loading: false,
    error: null,
    nextToken: null,
  };
};

export const initialState = <T>(): EntityState<T> => {
  return {
    entity: null,
    entities: null,
    loading: false,
    error: null,
  };
};

export enum ActionType {
  CHAT_READ_CHAT_BY_ID = "chat/readChatById",
  CHAT_CREATE_CHAT = "chat/createChat",
  CHAT_GET_CURRENT_OR_CREATE_CHAT = "chat/getCurrentOrCreateChat",
  MESSAGE_CREATE_MESSAGE = "message/createMessage",
  MESSAGE_LIST_MESSAGES = "message/listMessages",
  CHAT_GET_LAST_CHAT_ACTIVE = "chat/getLastChatActive",
  MESSAGE_LOCAL_CREATE_MESSAGE_AND_SYNC = "message/localCreateMessageAndSync",
  CHAT_SEARCH_CHATS = "chat/searchChats",
  CHAT_GET_CHAT_BY_ID = "chat/getChatById",
  CHAT_CLOSE_CHAT = "chat/closeChat",
  GET_OR_CREATE_USER_CHAT_ID = "chat/getOrCreateUserChatId",
}

export enum ActionCase {
  rejected = "rejected",
  fulfilled = "fulfilled",
  pending = "pending",
}

export const getActionId = (
  actionType: ActionType,
  actionCase: ActionCase
): string => {
  return `${actionType}/${actionCase}`;
};
