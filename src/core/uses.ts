import { useEffect, useState } from "react";

export const useQuerystring = <T>() => {
  const [query, setQuery] = useState<Record<string, string>>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryObj: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });

    setQuery(queryObj);
  }, []);

  return query as T;
};
