import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Reducer, RootState } from "./store";
import { useEffect, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useEntityRecursiveDispatch = <StateValue>(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call: any,
  stateSelector: (state: Reducer) => StateValue,
  timeout = 1000
) => {
  const dispatch = useAppDispatch();
  const stateValue = useAppSelector(stateSelector);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      dispatch(call());
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      const t = setTimeout(() => {
        dispatch(call());
      }, timeout);

      return () => clearTimeout(t);
    }
  }, [stateValue, id]);

  const startDispatch = () => {
    setStart(true);
  };

  const stopDispatch = () => {
    setStart(false);
  };

  return { startDispatch, stopDispatch, start };
};
