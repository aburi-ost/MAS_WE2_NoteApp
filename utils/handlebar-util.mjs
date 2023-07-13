import { EntryState } from '../const/EntryState.mjs'
import { OrderDirection } from '../const/OrderDirection.mjs'

export const helpers = {
    if_eq: function (a, b, opts) {
        if (a === b) return opts.fn(this)
        else return opts.inverse(this)
    },
    get_EntryState_Completed: function () {
        return EntryState.Completed
    },
    dueDate_in_Days: function (dueDate) {
        const inputDate = new Date(dueDate).setUTCHours(0, 0, 0, 0)
        if (isNaN(inputDate)) {
            return 'Someday';
        }
        const today = new Date().setUTCHours(0, 0, 0, 0)
        const daysUntilDueDate = (inputDate - today) / (1000 * 60 * 60 * 24)

        switch (true) {
            case daysUntilDueDate === 0:
                return 'now'
            case daysUntilDueDate === -1:
                return 'a day ago'
            case daysUntilDueDate === 1:
                return 'in a day'
            case daysUntilDueDate > 1 && daysUntilDueDate <= 7:
                return `in ${daysUntilDueDate} days`
            case daysUntilDueDate > 7 :
                return `in > 7 days`
            case daysUntilDueDate < 0 && daysUntilDueDate >= -7 :
                return `${Math.abs(daysUntilDueDate)} days ago`
            case daysUntilDueDate < -7 :
                return `> 7 days ago`
            default:
                return 'Someday'
        }
    },
    get_importance_icons: function (value) {
        /*
        // Todo: Some sort of safety check?
        if (typeof value !== 'number' || isNaN(value)) {
            return 'Invalid value';
        }
         */
        return '🗲'.repeat(value);
    },
    get_orderDirection_icon : function (orderDirection) {
        if (orderDirection === OrderDirection.Ascending) {
            return '\u25B2'
        } else if (orderDirection === OrderDirection.Descending) {
            return '\u25BC'
        } else {
            return ' '
        }
     },
}
