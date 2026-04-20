import { useEffect, useRef, useState } from "react";

export function useAsyncData(loader, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function run() {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await loader();
      if (!isMountedRef.current) return;
      setData(result);
    } catch (loadError) {
      if (!isMountedRef.current) return;
      setError(loadError.response?.data?.message || loadError.message || "Failed to load data.");
    } finally {
      if (!isMountedRef.current) return;
      setIsLoading(false);
    }
  }

  useEffect(() => {
    run();
  }, dependencies);

  return {
    data,
    setData,
    isLoading,
    error,
    reload: run
  };
}
