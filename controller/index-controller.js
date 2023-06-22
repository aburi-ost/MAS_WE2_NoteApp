import { noteEntryStore } from "../services/noteEntry-store.js";

export class IndexController {
  DataBaseEntries = [];
  FilteredDataBaseEntries = [];

  filterCompleted = () => {
    this.FilteredDataBaseEntries = this.DataBaseEntries.filter(
      (entry) => entry.state != "COMPLETED"
    );
  };

  sortByTitle = () => {
    this.FilteredDataBaseEntries = this.DataBaseEntries.sort((a, b) => {
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

  sortByImportance = () => {
    this.FilteredDataBaseEntries = this.DataBaseEntries.sort((a, b) => {
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

  sortByDueDate = () => {
    this.FilteredDataBaseEntries = this.DataBaseEntries.sort((a, b) => {
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

  indexWithFetch = async (req, res) => {
    this.DataBaseEntries = await noteEntryStore.all();
    res.render("index", { data: this.DataBaseEntries, dark: false });
  }

  index = async (req, res) => {
    if (req.query.fetchData === "true") {
      // If fetchData is not included or set to any value other than 'true', the noteEntryStore.all() method will not be executed and data will remain an empty array.
      this.DataBaseEntries = await noteEntryStore.all();
      // Sortierfunktion muss ins .all() --> .getAll(ParameterToOrderBy)
      // gehört zur Modell-Logik!
    }

    this.FilteredDataBaseEntries = this.DataBaseEntries;

    // Todo: manage with cookies instead of query. See: utils/session-middleware.index.js
    if (req.query.filterCompleted === "true") {
      this.filterCompleted();
    }

    // Todo: manage with cookies instead of query. See: utils/session-middleware.index.js
    if (req.query.sortDataBy === "title") {
      this.sortByTitle();
    } else if (req.query.sortDataBy === "importance") {
      this.sortByImportance();
    } else if (req.query.sortDataBy === "dueDate") {
      this.sortByDueDate();
    }

    res.render("index", { data: this.FilteredDataBaseEntries, dark: false });
  };

  createNoteEntryAndRenderData = async (req, res) => {
    await noteEntryStore.add(
        req.body.noteDueDate,
        req.body.noteTitle,
        req.body.noteImportance,
        req.body.noteState,
        req.body.noteDescription
    );
    this.DataBaseEntries = await noteEntryStore.all();
    res.render("index", { data: this.DataBaseEntries, dark: false });
  }
}



export const indexController = new IndexController();
