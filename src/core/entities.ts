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
  MESSAGE_CREATE_MESSAGE = "message/createMessage",
  MESSAGE_LIST_MESSAGES = "message/listMessages",
  MESSAGE_LOCAL_CREATE_MESSAGE_AND_SYNC = "message/localCreateMessageAndSync",
  CONFIG_GET_CURRENT_OR_CREATE_CONFIG = "config/getCurrentOrCreateConfig",
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
