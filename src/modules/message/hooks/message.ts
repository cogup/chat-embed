import {
  useAppDispatch,
  useAppSelector,
  useEntityRecursiveDispatch,
} from "../../../core/hooks";
import { useEffect, useState } from "react";
import { listMessages } from "../entities/message";
import { Reducer } from "../../../core/store";
import { useConfig } from "../../chat/hooks/chat";
import { Message } from "../interfaces";

export const useMessagesListener = () => {
  const config = useConfig();

  const entities = useAppSelector((state) => state.messageEntity.entities);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const recursiveDispatchListMessages = useEntityRecursiveDispatch(
    config.token,
    () => listMessages(),
    (state: Reducer) => state.messageEntity.entities,
    5000
  );

  useEffect(() => {
    if (entities) {
      if (entities.length >= localMessages.length) {
        setLocalMessages(entities);
      }
    }

    return () => recursiveDispatchListMessages.stopDispatch();
  }, [recursiveDispatchListMessages, entities, localMessages]);

  useEffect(() => {
    recursiveDispatchListMessages.startDispatch();

    return () => recursiveDispatchListMessages.stopDispatch();
  }, [recursiveDispatchListMessages, entities]);

  if (!config) {
    return [];
  }

  return localMessages;
};

export const useMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messageEntity.entities);
  const chat = useConfig();

  useEffect(() => {
    if (chat) {
      dispatch(listMessages());
    }
  }, [dispatch, chat]);

  return messages;
};
