import { EntryState } from '../const/EntryState.mjs'
export const helpers = {
    if_eq: function (a, b, opts) {
        if (a === b) return opts.fn(this)
        else return opts.inverse(this)
    },
    get_EntryState_Completed: function () {
        return EntryState.Completed
    },
}
