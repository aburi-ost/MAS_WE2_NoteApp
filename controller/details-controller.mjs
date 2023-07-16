import { noteEntryStore } from '../services/note-entry-store.mjs'

export class DetailsController {
    redirectRequest = (req, res, id) => {
        if (
            'update_overview_button' in req.body ||
            'create_overview_button' in req.body
        ) {
            res.redirect('/')
        } else if ('update_button' in req.body || 'create_button' in req.body) {
            res.redirect(`/details/${id}`)
        } else {
            res.redirect('/')
        }
    }

    detailsEmpty = async (req, res) => {
        res.render('details', {
            dark: req.userSettings.darkMode,
        })
    }

    detailsByID = async (req, res) => {
        const readEntry = await noteEntryStore.getSingle(req.params.id)
        if (!readEntry) {
            res.status(404).send('Entry not found.')
        } else {
            res.render('details', {
                data: readEntry,
                dark: req.userSettings.darkMode,
            })
        }
    }

    createEntry = async (req, res) => {
        let retVal = await noteEntryStore.add(
            req.body.dueDate,
            req.body.title,
            req.body.importance,
            req.body.state,
            req.body.description
        )
        this.redirectRequest(req, res, retVal._id)
    }

    updateEntry = async (req, res) => {
        await noteEntryStore.update(
            req.params.id,
            req.body.dueDate,
            req.body.title,
            req.body.importance,
            req.body.state,
            req.body.description
        )
        this.redirectRequest(req, res, req.params.id)
    }
}

export const detailsController = new DetailsController()
