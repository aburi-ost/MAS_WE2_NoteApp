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
        userSettings.orderBy = orderBy
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection
    }
    if (filterCompleted) {
        userSettings.filterCompleted = filterCompleted
    }
    if (darkMode) {
        userSettings.darkMode = !userSettings.darkMode
    }
    req.userSettings = req.session.userSettings = userSettings
    next()
}
