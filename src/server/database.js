export const createDatabase = initialItems => {
  const items = initialItems != null ? initialItems : [];

  return {
    add: item => {
      const newIndex = items.length > 0 ? items[items.length - 1].id + 1 : 1;
      const newItem = { ...item, id: newIndex };
      items.push(newItem);

      return newItem;
    },
    delete: id => {
      items.splice(id - 1, 1);
    },
    getAll: () => items,
    update: item => {
      items[item.id - 1] = item;
    },
  };
};
