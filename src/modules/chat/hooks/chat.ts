import { useAppDispatch, useAppSelector } from "../../../core/hooks";
import { useEffect } from "react";
import { startChat } from "../entities/config";
import { Config } from "../interfaces";
import { useQuerystring } from "../../../core/uses";

interface Querystring {
  // activeStartLoop
  l?: boolean;
}

export const useConfig = (): Config | null => {
  const { l: activeStartLoop } = useQuerystring<Querystring>();
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state: any) => state.chatEntity.entity);

  useEffect(() => {
    dispatch(startChat());
  }, [dispatch]);

  useEffect(() => {
    if (activeStartLoop && chat) {
      const t = setTimeout(() => {
        dispatch(startChat());
      }, 300);

      return () => {
        clearTimeout(t);
      };
    }
  }, [activeStartLoop, chat]);

  return chat;
};
