// hooks/useAuth.js
import { useState, useEffect, useMemo } from "react";

// A true useAuth impl takes care of caching, and revalidating etc, this is just for this example
export const useAuth = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("/api/auth/status", { signal })
      .then((res) => res.json())
      .then((data) => {
        setUid(data.uid);
        setStatus("done");
      })
      .catch(() => {
        if (signal.aborted) {
          // console.log("aborted status check");
        }
        setStatus("error");
      });

    return () => {
      controller.abort;
    };
  }, []);

  return useMemo(() => ({ uid, setUid, status }), [uid, setUid, status]);
};
