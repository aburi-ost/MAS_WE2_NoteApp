export const errorHandler = (err, req, res) => {
  res.status(500).end(err.message);
};
