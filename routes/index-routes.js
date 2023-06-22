import express from "express";

const router = express.Router();
import { indexController } from "../controller/index-controller.js";

import { newEntryController } from "../controller/newEntry-controller.js";

//router.get("/", indexController.index.bind(indexController));
router.get("/", indexController.indexWithFetch.bind(indexController));  // JavaScript kann "this" verloren gehen und mit bind instanz von indexController wird garantiert auf this gelink
router.get("/index", indexController.index);
router.post("/index", indexController.createNoteEntryAndRenderData);
//=====================================================
router.get("/entries", newEntryController.newNoteEntry);
router.post("/entries", newEntryController.createNoteEntry);


export const indexRoutes = router;
