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
    return this.db.insert(newNoteEntry);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { state: "COMPLETED" } });
    return this.get(id);
  }

  async all() {
    console.log("Fetching all data from DB");
    return this.db.find({});
  }
}

export const noteEntryStore = new NoteEntryStore(); // Creating an instance of the NoteEntryStore class and exporting it as a constant named 'orderStore'
