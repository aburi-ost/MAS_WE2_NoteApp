import express from "express";

const detailsRouter = express.Router();
import { detailsController } from "../controller/details-controller.js";

detailsRouter.get("/", detailsController.details);
detailsRouter.post("/", detailsController.createEntry);

export const detailsRoutes = detailsRouter;
