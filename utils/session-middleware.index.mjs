import { OrderBy } from '../const/OrderBy.mjs'
import { OrderDirection } from '../const/OrderDirection.mjs'

export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {
        orderBy: OrderBy.Title,
        orderDirection: OrderDirection.Ascending,
        filterCompleted: false,
        darkMode: false,
    }
    const { orderBy, orderDirection, filterCompleted, darkMode } = req.query
    if (orderBy) {
        // Todo: Sven, this was an quick and dirty adjustment by me to be able to revert the ordering direction of the entries. Please have a look and correct it
        //userSettings.orderBy = orderBy
        if (userSettings.orderBy === orderBy) {
            userSettings.orderDirection = (userSettings.orderDirection === OrderDirection.Ascending) ? OrderDirection.Descending : OrderDirection.Ascending;
        } else {
            userSettings.orderBy = orderBy
            userSettings.orderDirection = OrderDirection.Ascending; // reset order direction on change of order criteria
        }
        // Todo: Changing the order by criterion seems to clear the filterCompleted settings
    }
    if (orderDirection) {
        // Todo: This seems not to be handled as there is no direct option for the user to manipulate it
        userSettings.orderDirection = orderDirection
    }
    if (filterCompleted) {
        // Todo: Sven, this was an quick and dirty adjustment by me to be able to revert the ordering direction of the entries. Please have a look and correct it
        //userSettings.filterCompleted = filterCompleted
        userSettings.filterCompleted = (!userSettings.filterCompleted);
    }
    if (darkMode) {
        userSettings.darkMode = !userSettings.darkMode
    }
    req.userSettings = req.session.userSettings = userSettings
    next()
}
