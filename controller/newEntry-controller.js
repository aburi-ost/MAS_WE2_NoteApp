import { noteEntryStore } from "../services/noteEntry-store.js";

// Todo: rename from "NewEntry" to "details"
export class NewEntryController {
  newNoteEntry = async (req, res) => {
    res.render("newEntryForm");
  };

  createNoteEntry = async (req, res) => {
    // Todo: In case of "Create & Overview" this function must redirect to "/" --> Res.redirect("/")

    await noteEntryStore.add(
      req.body.noteDueDate,
      req.body.noteTitle,
      req.body.noteImportance,
      req.body.noteState,
      req.body.noteDescription
    );
    // Todo: Contents of form needs to persist on simple create and create button needs to change to "Update"
    res.render("newEntryForm");
  };

  deleteOrder = async (req, res) => {
    // Todo Gfeller: Same here as in createNoteEntry. had to make noteEntryStore.delete synchronous  Todo: include and use in delete functionality
    await noteEntryStore.delete(req.params.noteId);
  };
}

export const newEntryController = new NewEntryController();
