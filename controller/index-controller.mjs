import { noteEntryStore } from '../services/noteEntry-store.mjs'

export class IndexController {
    index = async (req, res) => {
        // Todo change sortByData to use session middleware instead of queries (--> also adjust all sort and filter buttons in index)
        // Note: For this project, the newly sorted table can be displayed through a re-render. Using AJAX is not necessary
        let ParameterToOrderBy = req.query.orderBy
        res.render('index', {
            data: await noteEntryStore.getAll(ParameterToOrderBy),
            dark: req.userSettings.darkMode,
        })
    }
}

export const indexController = new IndexController()
