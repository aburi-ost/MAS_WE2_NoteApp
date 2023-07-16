import override from "method-override";

export const overrideMiddleware = override(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
});
