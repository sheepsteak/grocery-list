import React, { useState } from "react";
import { Entry } from "./Entry";
import { useAddItem } from "./hooks/useAddItem";
import { useGetItems } from "./hooks/useGetItems";
import { useUpdateItem } from "./hooks/useUpdateItem";
import { Item } from "./Item";
import "./List.css";

export const List = () => {
  const [items, setItems] = useState([]);

  const getItems = useGetItems(setItems);
  const addItem = useAddItem(setItems);
  const updateItem = useUpdateItem(setItems);

  if (getItems.loading) {
    return null;
  }

  return (
    <div className="list">
      <Entry loading={addItem.loading} onSubmit={addItem.send} />
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id}>
            <Item
              description={item.description}
              id={item.id}
              isComplete={item.isComplete}
              onComplete={updateItem.update}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
