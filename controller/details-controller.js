import { noteEntryStore } from "../services/noteEntry-store.js";

export class DetailsController {
  details = async (req, res) => {
    res.render("details");
  };

  createNoteEntry = async (req, res) => {
    await noteEntryStore.add(
      req.body.noteDueDate,
      req.body.noteTitle,
      req.body.noteImportance,
      req.body.noteState,
      req.body.noteDescription
    );
    // Todo Contents of form needs to persist on simple create and create button needs to change to "Update"
    if (req.query.redirect === "true") {
      res.redirect("/");
    } else {
      res.render("details");
    }
  };

  deleteEntry = async (req, res) => {
    // Todo implement functionality (delete & reload) and add appropriate redirection
    await noteEntryStore.delete(req.params.noteId);
  };
}

export const detailsController = new DetailsController();
