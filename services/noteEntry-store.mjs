import Datastore from 'nedb-promises'
import { OrderBy } from '../const/OrderBy.mjs'
import { OrderDirection } from '../const/OrderDirection.mjs'

export class NoteEntry {
    constructor(dueDate, title, importance, state, description) {
        this.creationDate = new Date();
        this.dueDate = dueDate;
        this.title = title;
        this.importance = importance;
        this.state = state; // Todo: replace with predefined constant value (like in OrderBy) instead of assigning strings in business logic
        this.description = description;
    }
}

export class NoteEntryStore {
    // Helper functions
    // Todo move helper functions to a dedicated file if necessary (or adjust visibility)
    //--------------------------------------
    filterCompleted = (DataBaseEntries, orderDirection) => {
        return DataBaseEntries.filter((entry) => entry.state !== 'COMPLETED')
    }

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
            return this.orderLogic(a.dueDate,  b.dueDate, orderDirection)
        })
    }
    orderByCreationDate = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            const nameA = a.creationDate
            const nameB = b.creationDate
            return this.orderLogic(nameA, nameB, orderDirection)
        })
    }
    //--------------------------

    constructor(db) {
        this.db =
            db ||
            new Datastore({ filename: './data/NoteEntries.db', autoload: true })
    }

    async add(dueDate, title, importance, state, description) {
        if (typeof state === 'undefined') {
            state = 'OPEN'
        }

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
        await this.db.update({ _id: id }, { $set: { state: 'COMPLETED' } })
    }

    async update(id, dueDate, title, importance, state, description) {
        await this.db.update(
            { _id: id },
            {
                $set: {
                    dueDate: dueDate,
                    title: title,
                    importance: importance,
                    state: state,
                    description: description,
                },
            }
        )
    }

    async getSingle(id) {
        //Todo: This await was redundant --> needs to be placed on function call or make method sync instead of async
        // return await this.db.find({ _id: id })
        return this.db.find({ _id: id })
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
