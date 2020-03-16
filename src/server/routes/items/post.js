export const postItem = (req, res, next) => {
  const { description, isComplete } = req.body;
  const newItem = req.database.add({ description, isComplete });

  res.json(newItem);
};
