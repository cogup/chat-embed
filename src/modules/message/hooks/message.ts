import {
  useAppDispatch,
  useAppSelector,
  useEntityRecursiveDispatch,
} from "../../../core/hooks";
import { useEffect, useState } from "react";
import { listMessages } from "../entities/message";
import { Reducer } from "../../../core/store";
import { useChat } from "../../chat/hooks/chat";
import { Message } from "../interfaces";

export const useMessagesListener = () => {
  const chat = useChat();

  const entities = useAppSelector((state) => state.messageEntity.entities);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [lastChatId, setLastChatId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const recursiveDispatchListMessages = useEntityRecursiveDispatch(
    chat.userChatId,
    () => listMessages(),
    (state: Reducer) => state.messageEntity.entities,
    5000
  );

  useEffect(() => {
    if (chat && chat.id !== lastChatId) {
      setLastChatId(chat.id);
      dispatch(listMessages());
      setLocalMessages([]);
    }
  }, [chat, lastChatId, dispatch]);

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

  if (!chat) {
    return [];
  }

  return localMessages;
};

export const useMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messageEntity.entities);
  const chat = useChat();

  useEffect(() => {
    if (chat) {
      dispatch(listMessages());
    }
  }, [dispatch, chat]);

  return messages;
};
