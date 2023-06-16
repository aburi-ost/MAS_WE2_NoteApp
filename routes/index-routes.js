import express from "express";

const router = express.Router();
import { indexController } from "../controller/index-controller.js";

import { newEntryController } from "../controller/newEntry-controller.js";

router.get("/", indexController.index.bind(indexController));
router.get("/index", indexController.index);
//=====================================================
router.get("/entries", newEntryController.newNoteEntry);
router.post("/entries", newEntryController.createNoteEntry);


export const indexRoutes = router;
