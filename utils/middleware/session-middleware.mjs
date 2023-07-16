import { OrderBy } from '../../const/order-by.mjs'
import { OrderDirection } from '../../const/order-direction.mjs'

export const sessionUserSettings = (req, res, next) => {
    const currentUserSettings = req.session?.userSettings || {
        orderBy: OrderBy.Title,
        orderDirection: OrderDirection.Ascending,
        filterCompleted: false,
        darkMode: false,
    }

    if (req.method === 'POST') {
        const {orderBy, filterCompleted, darkMode} = req.body

        if (orderBy) {
            if (currentUserSettings.orderBy === orderBy) {
                currentUserSettings.orderDirection = (currentUserSettings.orderDirection === OrderDirection.Ascending) ? OrderDirection.Descending : OrderDirection.Ascending;
            } else {
                currentUserSettings.orderBy = orderBy
                currentUserSettings.orderDirection = OrderDirection.Ascending;
            }
        }

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
