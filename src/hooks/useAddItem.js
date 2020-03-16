import { useCallback, useState } from "react";

export const useAddItem = setItems => {
  const [state, setState] = useState({
    error: false,
    loading: false,
  });

  const send = useCallback(
    async data => {
      setState(prev => ({
        ...prev,
        loading: true,
      }));

      const response = await fetch("/api/items", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const item = await response.json();

      setItems(items => [...items, item]);
      setState(() => ({
        error: false,
        loading: false,
      }));
    },
    [setItems],
  );

  return { ...state, send };
};
