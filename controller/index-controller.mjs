import { noteEntryStore } from '../services/noteEntry-store.mjs'

export class IndexController {
    index = async (req, res) => {
        res.render('index', {
            data: await noteEntryStore.getAll(req.userSettings),
            dark: req.userSettings.darkMode,
            orderBy: req.userSettings.orderBy,
            orderDirection: req.userSettings.orderDirection,
            filterCompleted: req.userSettings.filterCompleted
        })
    }

    redirectPost = async(req,res) => {
        res.redirect("/index")
    }
}

export const indexController = new IndexController()
