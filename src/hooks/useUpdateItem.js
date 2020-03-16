import { useCallback, useState } from "react";

export const useUpdateItem = setItems => {
  const [state, setState] = useState({
    error: false,
    loading: false,
  });

  const update = useCallback(
    async (id, data) => {
      setState(prev => ({
        ...prev,
        loading: true,
      }));

      const response = await fetch(`/api/items/${id}`, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
      });

      const returnedItem = await response.json();

      setItems(items =>
        items.reduce((prev, curr) => {
          if (returnedItem.id !== curr.id) {
            return [...prev, curr];
          }

          return [...prev, returnedItem];
        }, []),
      );
      setState(() => ({
        error: false,
        loading: false,
      }));
    },
    [setItems],
  );

  return { ...state, update };
};
