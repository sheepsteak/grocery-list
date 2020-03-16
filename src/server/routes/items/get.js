export const getItems = (req, res, next) => {
  const items = req.database.getAll();

  res.json(items);
};
