import { useCallback, useMemo, useState } from "react";
import { AxiosResponse } from "axios";

export const useRequest = <T, R extends Array<unknown>>(
  request: (...params: R) => Promise<AxiosResponse<T>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<T>();

  const sendRequest = useCallback(
    async (...params: R) => {
      try {
        setIsLoading(true);
        const response = await request(...params);

        setData(response.data);
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setIsLoading(false);
      }
    },
    [request]
  );

  return useMemo(
    () => ({
      sendRequest,
      isLoading,
      error,
      data,
    }),
    [sendRequest, isLoading, error, data]
  );
};
