import express from "express";

const updateRouter = express.Router();
import { updateController } from "../controller/update-controller.js";

updateRouter.get("/", updateController.update);
updateRouter.post("/", updateController.updateEntry);

export const updateRoutes = updateRouter;
