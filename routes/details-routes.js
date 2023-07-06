import express from "express";

const detailsRouter = express.Router();
import { detailsController } from "../controller/details-controller.js";

detailsRouter.get("/details", detailsController.newNoteEntry);
detailsRouter.post("/details", detailsController.createNoteEntry);

export const detailsRoutes = detailsRouter;
