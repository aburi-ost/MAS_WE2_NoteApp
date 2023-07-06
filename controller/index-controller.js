import { noteEntryStore } from "../services/noteEntry-store.js";

export class IndexController {

  index = async (req, res) => {
    // Note: For this project, the newly sorted table can be displayed through a re-render. Using AJAX is not necessary
    let ParameterToOrderBy = req.query.sortDataBy;
    res.render("index", { data: await noteEntryStore.getAll(ParameterToOrderBy), dark: false });
  };
}



export const indexController = new IndexController();
