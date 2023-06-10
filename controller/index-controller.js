import {noteEntryStore} from '../services/noteEntry-store.js';

export class IndexController {

    index = async (req, res) => { // Defining an asynchronous function to show an order
        //res.render("index", {data: "Hello World", dark: true});
        // Retrieving the order from the orderStore based on the provided ID
        // Rendering the 'showorder.hbs' file as the content of the 'body' section in 'default.hbs'
        //res.render("index", await noteEntryStore.all());
        res.render("index", {data: await noteEntryStore.all(), dark: true});
    };

    newNoteEntry = (req, res) => {
        res.render("newEntryForm"); // Rendering the 'newOrder.hbs' file
    };

    createNoteEntry = async (req, res) => { // Defining an asynchronous function to create a pizza
        // Storing the pizza in the persistent storage (nedb)
        // After the operation is complete, rendering the 'index.hbs' file as the content of the 'body' section in 'default.hbs'
        /* res.render("index", await noteEntryStore.add(
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        ));
         */
        // Todo: please check this for validity. I Had to make the noteEntryStore.add function NOT async to be able to wait for it's conclusion

        const result = await (noteEntryStore.add(
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        ));

        res.render("index", {data: await noteEntryStore.all(), dark: true});

    };
/*
    showOrder = async (req, res) => { // Defining an asynchronous function to show an order
        // Retrieving the order from the orderStore based on the provided ID
        // Rendering the 'showorder.hbs' file as the content of the 'body' section in 'default.hbs'
        res.render("showorder", await orderStore.get(req.params.id));
    };

    deleteOrder = async (req, res) => { // Defining an asynchronous function to delete an order
        // Deleting the order from the orderStore based on the provided ID
        // Rendering the 'showorder.hbs' file as the content of the 'body' section in 'default.hbs'
        res.render("showorder", await orderStore.delete(req.params.id));
    };
 */
}

export const indexController = new IndexController();
