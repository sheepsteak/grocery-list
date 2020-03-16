export const patchItem = (req, res, next) => {
  const data = req.body;
  const items = req.database.getAll();
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  const itemToUpdate = items.find(i => i.id === id);

  if (itemToUpdate == null) {
    return res.sendStatus(404);
  }

  const {
    description = itemToUpdate.description,
    isComplete = itemToUpdate.isComplete,
  } = req.body;

  const newItem = {
    ...itemToUpdate,
    description,
    isComplete,
  };

  req.database.update(newItem);

  res.json(newItem);
};
