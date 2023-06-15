import express from "express";

const router = express.Router();
import { indexController } from "../controller/index-controller.js";

router.get("/", indexController.index.bind(indexController)); // Todo Gfeller: What's the difference between bind and non bind? apparently its about contextual execution
router.get("/index", indexController.index);
router.get("/entries", indexController.newNoteEntry);
router.post("/entries", indexController.createNoteEntry);

export const indexRoutes = router;
