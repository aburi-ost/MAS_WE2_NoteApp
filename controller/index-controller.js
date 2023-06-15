import { noteEntryStore } from "../services/noteEntry-store.js";

export class IndexController {
  DataBaseEntries = [];

  index = async (req, res) => {
    if (req.query.fetchData === "true") {
      // If fetchData is not included or set to any value other than 'true', the noteEntryStore.all() method will not be executed and data will remain an empty array.
      this.DataBaseEntries = await noteEntryStore.all();
    }
    res.render("index", { data: this.DataBaseEntries, dark: false });
    console.log("Rendered index.");
  };

  newNoteEntry = (req, res) => {
    res.render("newEntryForm");
  };

  createNoteEntry = async (req, res) => {
    // Todo Gfeller: please check this for validity.

    await noteEntryStore.add(
      req.body.noteDueDate,
      req.body.noteTitle,
      req.body.noteImportance,
      req.body.noteState,
      req.body.noteDescription
    );
    // no render is executed to keep the state of the dbDataHasChanged for the overview button in newEntryForm
    //res.render("newEntryForm");
  };
  deleteOrder = async (req, res) => {
    // Todo Gfeller: Same here as in createNoteEntry. had to make noteEntryStore.delete synchronous  Todo: include and use in delete functionality
    await noteEntryStore.delete(req.params.noteId);
    res.render("index", { data: await noteEntryStore.all(), dark: true });
  };
}

export const indexController = new IndexController();
