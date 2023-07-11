export const notFound = (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send("Nix da!");
};
