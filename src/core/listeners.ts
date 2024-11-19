import { useEffect, useState } from "react";
import {
  ListenerEffectAPI as ListenerEffectAPIRedux,
  ThunkDispatch,
  UnknownAction,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

export const listenerMiddlewareEvents = createListenerMiddleware();

export type ListenerEffectAPI = ListenerEffectAPIRedux<
  unknown,
  ThunkDispatch<unknown, unknown, UnknownAction>,
  unknown
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useListenerAction = <T>(action: any) => {
  const [eventData, setEventData] = useState<{
    payload: T;
    listenerApi: ListenerEffectAPI;
  } | null>(null);

  useEffect(() => {
    listenerMiddlewareEvents.startListening({
      matcher: isAnyOf(...[].concat(action)),
      effect: (action, listenerApi) => {
        setEventData({
          payload: action.payload as T,
          listenerApi,
        });
      },
    });
  }, []);

  return eventData;
};
