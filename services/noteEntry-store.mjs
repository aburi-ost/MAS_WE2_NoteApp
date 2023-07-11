import Datastore from 'nedb-promises'

export class NoteEntry {
    constructor(dueDate, title, importance, state, description) {
        this.dueDate = dueDate
        this.title = title
        this.importance = importance
        this.state = state
        this.description = description
    }
}

export class NoteEntryStore {
    // Helper functions
    // Todo move helper functions to a dedicated file if necessary (or adjust visibility)
    // Todo implement descending sorting algorithms
    //--------------------------------------
    filterCompleted = (DataBaseEntries, orderDirection) => {
        return DataBaseEntries.filter((entry) => entry.state !== 'COMPLETED')
    }

    orderByTitle = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            const nameA = a.title.toUpperCase()
            const nameB = b.title.toUpperCase()
            if (nameA < nameB) {
                return (orderDirection === 'asc') ? -1 : 1
                //return -1
            }
            if (nameA > nameB) {
                return (orderDirection === 'asc') ? 1 : -1
                //return 1
            }
            return 0
        })
    }

    orderByImportance = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            const nameA = a.importance
            const nameB = b.importance
            if (nameA < nameB) {
                return (orderDirection === 'asc') ? -1 : 1
                //return -1
            }
            if (nameA > nameB) {
                return (orderDirection === 'asc') ? 1 : -1
                //return 1
            }
            return 0
        })
    }

    orderByDueDate = (DataBaseEntries, orderDirection) => {
        DataBaseEntries.sort((a, b) => {
            const nameA = a.dueDate
            const nameB = b.dueDate
            if (nameA < nameB) {
                return (orderDirection === 'asc') ? -1 : 1
                //return -1
            }
            if (nameA > nameB) {
                return (orderDirection === 'asc') ? 1 : -1
                //return 1
            }
            return 0 // a and b are equal in terms of sorting
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

    async getAll(orderBy, orderDirection) {
        let dataBaseEntries = await this.db.find({})

        if (orderBy === 'filterCompleted') {
            dataBaseEntries = this.filterCompleted(dataBaseEntries, orderDirection)
        } else if (orderBy === 'title') {
            this.orderByTitle(dataBaseEntries, orderDirection)
        } else if (orderBy === 'importance') {
            this.orderByImportance(dataBaseEntries, orderDirection)
        } else if (orderBy === 'dueDate') {
            this.orderByDueDate(dataBaseEntries, orderDirection)
        } else if (orderBy === 'creationDate') {
            this.orderByCreationDate(dataBaseEntries, orderDirection)
        }
        return dataBaseEntries
    }
}

export const noteEntryStore = new NoteEntryStore() // Creating an instance of the NoteEntryStore class and exporting it as a constant named 'orderStore'
