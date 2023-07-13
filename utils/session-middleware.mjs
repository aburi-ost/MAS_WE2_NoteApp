import { OrderBy } from '../const/OrderBy.mjs'
import { OrderDirection } from '../const/OrderDirection.mjs'

export const sessionUserSettings = (req, res, next) => {
    const currentUserSettings = req.session?.userSettings || {
        orderBy: OrderBy.Title,
        orderDirection: OrderDirection.Ascending,
        filterCompleted: false,
        darkMode: false,
    }

    // reject GET requests - only POSTs are allowed to alter session
    if (req.method === 'POST') {
        const {orderBy, orderDirection, filterCompleted, darkMode} = req.body
        if (orderBy) {
            //userSettings.orderBy = orderBy
            if (currentUserSettings.orderBy === orderBy) {
                currentUserSettings.orderDirection = (currentUserSettings.orderDirection === OrderDirection.Ascending) ? OrderDirection.Descending : OrderDirection.Ascending;
            } else {
                currentUserSettings.orderBy = orderBy
                currentUserSettings.orderDirection = OrderDirection.Ascending; // reset order direction on change of order criteria
            }
        }
        // Todo: This seems not to be handled as there is no direct option for the user to manipulate it
        /*
        if (orderDirection) {
            currentUserSettings.orderDirection = orderDirection
        }
         */
        if (filterCompleted) {
            currentUserSettings.filterCompleted = !currentUserSettings.filterCompleted;
        }
        if (darkMode) {
            currentUserSettings.darkMode = !currentUserSettings.darkMode
        }
    }
    req.userSettings = req.session.userSettings = currentUserSettings
    next()
}
