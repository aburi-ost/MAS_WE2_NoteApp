import { noteEntryStore } from "../services/noteEntry-store.js";

export class UpdateController {
  update = async (req, res) => {
    res.render("update");
  };

  updateEntry = async(req, res) => {
    // Todo add functionality to read out and update existing data
    if (req.query.redirect === "true") {
      res.redirect("/");
    } else {
      res.redirect("/update");
    }
  }
}

export const updateController = new UpdateController();
