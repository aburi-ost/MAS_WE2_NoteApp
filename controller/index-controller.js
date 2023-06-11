import {noteEntryStore} from '../services/noteEntry-store.js';

export class IndexController {

    index = async (req, res) => { // Defining an asynchronous function to show an order
        res.render("index", {data: await noteEntryStore.all(), dark: true});
    };

    newNoteEntry = (req, res) => {
        res.render("newEntryForm"); // Rendering the 'newOrder.hbs' file
    };

    createNoteEntry = async (req, res) => { // Defining an asynchronous function to create a pizza
        // Todo: please check this for validity. I Had to make the noteEntryStore.add function NOT async to be able to wait for it's conclusion to make sure the await noteEntryStore.all() reads the latest data from the database

        await noteEntryStore.add(
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        );

        res.render("index", {data: await noteEntryStore.all(), dark: true});

    };
    deleteOrder =async (req, res) => { // Defining an asynchronous function to delete an order
        // Todo: Same here as in createNoteEntry. had to make noteEntryStore.delete synchronous
        // Todo: include and use in delete functionality
        await noteEntryStore.delete(req.params.noteId);
        res.render("index", {data: await noteEntryStore.all(), dark: true});
    };

}

export const indexController = new IndexController();
