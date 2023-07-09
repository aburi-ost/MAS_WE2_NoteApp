import Datastore from "nedb-promises";

export class NoteEntry {
  constructor(dueDate, title, importance, state, description) {
    this.dueDate = dueDate;
    this.title = title;
    this.importance = importance;
    this.state = state;
    this.description = description;
  }
}

export class NoteEntryStore {
  // Helper functions
  // Todo move helper functions to a dedicated file if necessary (or adjust visibility)
  // Todo implement descending sorting algorithms
  //--------------------------------------
  filterCompleted = (DataBaseEntries) => {
    return DataBaseEntries.filter((entry) => entry.state !== "COMPLETED");
  };

  sortByTitle = (DataBaseEntries) => {
    DataBaseEntries.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  sortByImportance = (DataBaseEntries) => {
    DataBaseEntries.sort((a, b) => {
      const nameA = a.importance;
      const nameB = b.importance;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  sortByDueDate = (DataBaseEntries) => {
    DataBaseEntries.sort((a, b) => {
      const nameA = a.dueDate;
      const nameB = b.dueDate;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // a and b are equal in terms of sorting
    });
  };
  //--------------------------

  constructor(db) {
    this.db =
      db ||
      new Datastore({ filename: "./data/NoteEntries.db", autoload: true });
  }

  async add(dueDate, title, importance, state, description) {
    if (typeof state === "undefined") {
      state = "OPEN";
    }

    let newNoteEntry = new NoteEntry(
      dueDate,
      title,
      importance,
      state,
      description
    );
    // TODO: checken ob es hier kein await braucht
    return this.db.insert(newNoteEntry);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { state: "COMPLETED" } });
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
    );
  }

  async getSingle(id) {
    return await this.db.find({ _id: id });
  }

  async getAll(ParameterToOrderBy) {
    let dataBaseEntries = await this.db.find({});

    if (ParameterToOrderBy === "filterCompleted") {
      dataBaseEntries = this.filterCompleted(dataBaseEntries);
    } else if (ParameterToOrderBy === "title") {
      this.sortByTitle(dataBaseEntries);
    } else if (ParameterToOrderBy === "importance") {
      this.sortByImportance(dataBaseEntries);
    } else if (ParameterToOrderBy === "dueDate") {
      this.sortByDueDate(dataBaseEntries);
    }

    return dataBaseEntries;
  }
}

export const noteEntryStore = new NoteEntryStore(); // Creating an instance of the NoteEntryStore class and exporting it as a constant named 'orderStore'
