import { useEffect, useState } from "react";

export const useGetItems = setItems => {
  const [state, setState] = useState({
    error: false,
    loading: true,
  });

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/items");

      const data = await response.json();

      setItems(data);
      setState({
        error: false,
        loading: false,
      });
    }

    fetchItems();
  }, [setItems]);

  return state;
};
