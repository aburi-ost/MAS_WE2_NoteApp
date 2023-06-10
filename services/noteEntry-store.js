import Datastore from 'nedb-promises'; // Importing the 'nedb-promises' library, which allows the use of promises with NeDB

export class NoteEntry {
    constructor(dueDate, title, importance, state, description) { // Defining the Entry class constructor
        this.dueDate = dueDate;
        this.title = title;
        this.importance = importance;
        this.state = "Open";
        this.description = description;
    }
}

export class NoteEntryStore {
    constructor(db) { // Defining the NoteEntryStore class constructor
        // Creating a new NeDB datastore instance with the specified filename and enabling automatic loading
        this.db = db || new Datastore({filename: './data/NoteEntries.db', autoload: true});
    }

    add(dueDate, title, importance, state, description) { // Defining an asynchronous function to add an NoteEntry to the datastore
        let newNoteEntry = new NoteEntry(dueDate, title, importance, state, description); // Creating a new NoteEntry instance with the provided pizza name and orderer
        // Inserting the NoteEntry into the datastore and returning the inserted NoteEntry
        // There's no need to use 'await' here because the 'insert' method returns a promise that is handled in the calling instance
        return this.db.insert(newNoteEntry);
    }

    async delete(id) { // Defining an asynchronous function to delete an NoteEntry from the datastore
        await this.db.update({_id: id}, {$set: {"state": "COMPLETED"}}); // Updating the NoteEntry's state to "COMPLETED" in the datastore
        return this.get(id); // Retrieving the updated NoteEntry and returning it
    }

    async get(id) { // Defining an asynchronous function to retrieve an noteEntry from the datastore based on its ID
        return this.db.findOne({_id: id}); // Finding and returning the NoteEntry with the specified ID
    }

    async all() { // Defining an asynchronous function to retrieve all NoteEntries from the datastore
        return this.db.find({}); // Finding and returning all NoteEntry in the datastore
    }
}

export const noteEntryStore = new NoteEntryStore(); // Creating an instance of the NoteEntryStore class and exporting it as a constant named 'orderStore'
