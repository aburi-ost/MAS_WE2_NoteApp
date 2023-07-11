import { noteEntryStore } from '../services/noteEntry-store.mjs'

export class DetailsController {

    redirect = (req, res, id) => {
        if (req.body.update_overview_button === 'Update & Overview' || req.body.create_overview_button === 'Create & Overview' ) {
                res.redirect('/')
            } else if (req.body.update_button === 'Update' || req.body.create_button === 'Create') {
                res.redirect(`/details/${id}`)
            } else {
                // Todo: default case may interfere with error middle ware -> check
                res.redirect('/')
            }
    }

    detailsEmpty = async (req, res) => {
        res.render('details', {
            dark: req.userSettings.darkMode,
        })
    }

    detailsByID = async (req, res) => {
            // Todo: replace update with subcategory of details
            res.render('update', {
                data: await noteEntryStore.getSingle(req.params.id),
                dark: req.userSettings.darkMode,
            });
    }

    createEntry = async (req, res) => {
        let retVal = await noteEntryStore.add(
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        )
        this.redirect(req,res, retVal._id);
    }
    setEntryCompleted = async (req, res) => {
        // Todo implement functionality (delete & reload) and add appropriate redirection
        await noteEntryStore.delete(req.params.id)
    }

    updateEntry = async (req, res) => {
        await noteEntryStore.update(
            req.params.id,
            req.body.noteDueDate,
            req.body.noteTitle,
            req.body.noteImportance,
            req.body.noteState,
            req.body.noteDescription
        )
        this.redirect(req,res, req.params.id);
    }
}

export const detailsController = new DetailsController()
