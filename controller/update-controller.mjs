import { noteEntryStore } from '../services/noteEntry-store.mjs'

export class UpdateController {
    update = async (req, res) => {
        // Todo: implement dark mode
        res.render('update', {
            data: noteEntryStore.getSingle(req.query.id),
            dark: false,
        })
    }

    updateEntry = async (req, res) => {
        await noteEntryStore.update(
            req.body.id,
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        )

        if (req.query.redirect === 'true') {
            res.redirect('/')
        } else {
            // Todo: redirect uses backticks to access req.body.id, the other redirect all don't (beccause they don't need access to qurey data)
            res.redirect(`/update?id=${req.body.id}`)
        }
    }
}

export const updateController = new UpdateController()
