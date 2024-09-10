import { useState, useEffect, useCallback } from "react";
import { useCache } from "./useCache";
export type FetchFunctionResult<T> = {
  data: T[];
  hasMore: boolean;
  lastId: string | null;
};
type FetchFunction<T> = (
  lastId: string | null,
  pageSize: number
) => Promise<FetchFunctionResult<T>>;

type UseCursorResult<T> = {
  data: T[];
  isFetching: boolean;
  fetchNextCursor: () => void;
  hasMore: boolean;
};

export function useCursor<T>(
  fetchFunction: FetchFunction<T>,
  pageSize: number,
  key: string
): UseCursorResult<T> {
  const { setCache, getCache } = useCache();
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNextCursor = useCallback(async () => {
    if (!hasMore || isFetching) return;

    setIsFetching(true);

    try {
      const result = await fetchFunction(lastId, pageSize);
      const cachedData = getCache(key) ?? [];
      const existingIds = new Set(cachedData.map((item: any) => item.$id));

      const newData = result.data.filter(
        (item: any) => !existingIds.has(item.$id)
      );

      if (newData.length > 0) {
        setCache(key, [...cachedData, ...newData]);
      }
      setLastId(result.lastId);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsFetching(false);
    }
  }, [fetchFunction, lastId, hasMore, isFetching, pageSize]);

  useEffect(() => {
    fetchNextCursor();
  }, []);

  return {
    data: getCache(key),
    isFetching,
    fetchNextCursor,
    hasMore,
  };
}
