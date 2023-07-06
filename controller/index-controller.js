import { noteEntryStore } from "../services/noteEntry-store.js";

export class IndexController {

  index = async (req, res) => {
    // Note: For this project, the newly sorted table can be displayed through a re-render. Using AJAX is not necessary
    let ParameterToOrderBy = req.query.sortDataBy;
    res.render("index", { data: await noteEntryStore.getAll(ParameterToOrderBy), dark: false });
  };

  createNoteEntryAndRenderData = async (req, res) => {
    await noteEntryStore.add(
        req.body.noteDueDate,
        req.body.noteTitle,
        req.body.noteImportance,
        req.body.noteState,
        req.body.noteDescription
    );
    this.DataBaseEntries = await noteEntryStore.getAll();
    res.render("index", { data: this.DataBaseEntries, dark: false });
  }
}



export const indexController = new IndexController();
