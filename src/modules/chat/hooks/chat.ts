import { useAppDispatch, useAppSelector } from "../../../core/hooks";
import { useEffect } from "react";
import { startChat } from "../entities/config";
import { Config } from "../interfaces";

export const useConfig = (): Config => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state: any) => state.chatEntity.entity);

  useEffect(() => {
    dispatch(startChat());
  }, [dispatch]);

  return chat;
};
