import Datastore from 'nedb-promises'
import { OrderBy } from '../const/OrderBy.mjs'
import { OrderDirection } from '../const/OrderDirection.mjs'
import { EntryState } from '../const/EntryState.mjs'

export class NoteEntry {
    constructor(dueDate, title, importance, state, description) {
        this.creationDate = new Date();
        this.dueDate = isNaN(new Date(dueDate)) ? '' : dueDate;
        this.title = title;
        this.importance = importance;
        this.state = (state === EntryState.Completed) ? EntryState.Completed : EntryState.Open;
        this.description = description;
    }
}

export class NoteEntryStore {
    // Helper functions
    // Todo move helper functions to a dedicated file if necessary (or adjust visibility)
    //--------------------------------------
    filterCompleted = (DataBaseEntries, orderDirection) => {
        return DataBaseEntries.filter((entry) => entry.state !== EntryState.Completed)
    }

    // TODO: Renaming Vorschlag: orderDirection. Achtung: Impact auf Unit-Test
    orderLogic = (nameA, nameB, orderDirection) => {
        if (nameA < nameB) {
            return (orderDirection === OrderDirection.Ascending) ? -1 : 1
        }
        if (nameA > nameB) {
            return (orderDirection === OrderDirection.Ascending) ? 1 : -1
        }
        return 0
    }

    orderByTitle = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            return this.orderLogic(a.title.toUpperCase(), b.title.toUpperCase(), orderDirection)
        })
    }

    orderByImportance = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            return this.orderLogic(a.importance, b.importance, orderDirection)
        })
    }

    orderByDueDate = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            const dateA = (a.dueDate === '') ? new Date(9999, 11, 31) : new Date(a.dueDate)
            const dateB = (b.dueDate === '') ? new Date(9999, 11, 31) : new Date(b.dueDate)
            return this.orderLogic(dateA,  dateB, orderDirection)
        })
    }
    orderByCreationDate = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            return this.orderLogic(a.creationDate, b.creationDate, orderDirection)
        })
    }
    //--------------------------

    constructor(db) {
        this.db =
            db ||
            new Datastore({ filename: './data/NoteEntries.db', autoload: true })
    }

    async add(dueDate, title, importance, state, description) {
        // Create temporary note entry to enforce constructor invaraince
        let newNoteEntry = new NoteEntry(
            dueDate,
            title,
            importance,
            state,
            description
        )
        // TODO: checken ob es hier kein await braucht
        return this.db.insert(newNoteEntry)
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { state: EntryState.Completed } })
    }

    async update(id, dueDate, title, importance, state, description) {
        // Create temporary note entry to enforce constructor invaraince
        const tempNoteEntry = new NoteEntry(
            dueDate,
            title,
            importance,
            state,
            description
        )
        await this.db.update(
            { _id: id },
            {
                $set: {
                    dueDate: tempNoteEntry.dueDate,
                    title: tempNoteEntry.title,
                    importance: tempNoteEntry.importance,
                    state: tempNoteEntry.state,
                    description: tempNoteEntry.description,
                },
            }
        )
    }

    async getSingle(id) {
        //Todo: This await was redundant --> needs to be placed on function call or make method sync instead of async
        return this.db.findOne({ _id: id })
    }

    async getAll(userSettings) {
        let dataBaseEntries = await this.db.find({})

        if (userSettings.filterCompleted === true) {
            dataBaseEntries = this.filterCompleted(dataBaseEntries, userSettings.orderDirection)
        }

        if (userSettings.orderBy === OrderBy.Title) {
            this.orderByTitle(dataBaseEntries, userSettings.orderDirection)
        } else if (userSettings.orderBy === OrderBy.Importance) {
            this.orderByImportance(dataBaseEntries, userSettings.orderDirection)
        } else if (userSettings.orderBy === OrderBy.DueDate) {
            this.orderByDueDate(dataBaseEntries, userSettings.orderDirection)
        } else if (userSettings.orderBy === OrderBy.CreationDate) {
            this.orderByCreationDate(dataBaseEntries, userSettings.orderDirection)
        }
        return dataBaseEntries
    }
}

export const noteEntryStore = new NoteEntryStore() // Creating an instance of the NoteEntryStore class and exporting it as a constant named 'orderStore'
