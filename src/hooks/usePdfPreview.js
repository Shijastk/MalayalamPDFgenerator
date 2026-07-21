import { useCallback, useEffect, useRef, useState } from "react";
import { renderToBlob } from "../lib/pdfEngine";

/**
 * Keeps a blob URL of the current document in sync with the editor, debounced
 * so dragging a slider doesn't re-render the PDF on every pixel.
 *
 * Returns `status` as one of: "loading" | "refreshing" | "ready" | "error".
 */
export function usePdfPreview(settings, { delay = 350 } = {}) {
  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

  // Guards against an older, slower render overwriting a newer one.
  const requestRef = useRef(0);
  const urlRef = useRef(null);

  useEffect(() => {
    const requestId = ++requestRef.current;
    setStatus(urlRef.current ? "refreshing" : "loading");

    const timer = setTimeout(() => {
      renderToBlob(settings)
        .then((blob) => {
          if (requestId !== requestRef.current) return;
          const nextUrl = URL.createObjectURL(blob);
          // The previous document is already painted, so releasing it here is
          // safe — and it keeps us from leaking a blob per keystroke.
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = nextUrl;
          setUrl(nextUrl);
          setError(null);
          setStatus("ready");
        })
        .catch((renderError) => {
          if (requestId !== requestRef.current) return;
          console.error("PDF preview failed", renderError);
          setError(renderError);
          setStatus("error");
        });
    }, delay);

    return () => clearTimeout(timer);
  }, [settings, delay, nonce]);

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    },
    [],
  );

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  return { url, status, error, refresh };
}
