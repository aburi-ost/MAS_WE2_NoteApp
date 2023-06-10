import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.index.bind(indexController));   // What's the difference between bind and non bind? apparently its about contextual execution
router.get("/index", indexController.index); // Defining a GET route for the '/orders' URL that invokes the createPizza method of the ordersController
router.get("/entries", indexController.newNoteEntry); // Defining a GET route for the '/entries' URL that invokes the createPizza method of the ordersController
router.post("/entries", indexController.createNoteEntry); // Defining a POST route for the '/entries' URL that invokes the createNoteEntry method of the ordersController

export const indexRoutes = router;
