import { useAppDispatch, useAppSelector } from "../../../core/hooks";
import { useEffect } from "react";
import { startChat } from "../entities/chat";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state: any) => state.chatEntity.entity);

  useEffect(() => {
    dispatch(startChat());
  }, [dispatch]);

  return chat;
};

export const useChatEntity = () => {
  return useAppSelector((state: any) => state.chatEntity);
};
