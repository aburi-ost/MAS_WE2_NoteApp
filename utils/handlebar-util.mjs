import { EntryState } from '../const/EntryState.mjs'
export const helpers = {
    if_eq: function (a, b, opts) {
        if (a === b) return opts.fn(this)
        else return opts.inverse(this)
    },
    get_EntryState_Completed: function () {
        return EntryState.Completed
    },
    dueDate_in_Days: function (dueDate) {
        const currentDate = new Date().setUTCHours(0, 0, 0, 0)
        const inputDate = new Date(dueDate).setUTCHours(0, 0, 0, 0)
        const daysUntilDate = (inputDate - currentDate) / (1000 * 60 * 60 * 24)
        switch (true) {
            case daysUntilDate === 0:
                return 'now'
            case daysUntilDate === -1:
                return 'a day ago'
            case daysUntilDate === 1:
                return 'in a day'
            case daysUntilDate > 1:
                return `in ${daysUntilDate} days`
            case daysUntilDate < 1:
                return `${Math.abs(daysUntilDate)} days ago`
            default:
                return 'Someday'
        }
    },
}
