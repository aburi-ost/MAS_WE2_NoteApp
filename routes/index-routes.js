import express from "express";

const router = express.Router();
import { indexController } from "../controller/index-controller.js";

import { detailsController } from "../controller/details-controller.js";

// Todo: Each controller should have its own rooter --> create rooter for NoteEntry
// JavaScript kann "this" verloren gehen und mit bind instanz von indexController wird garantiert auf this verbunden. --> erlaubt sichere verwendung von this innerhalb der Klasse. ist aber im projekt nicht nötig
router.get("/", indexController.indexWithFetch.bind(indexController));
router.get("/index", indexController.index);
router.post("/index", indexController.createNoteEntryAndRenderData);
//=====================================================
router.get("/details", detailsController.newNoteEntry);
router.post("/details", detailsController.createNoteEntry);


export const indexRoutes = router;
