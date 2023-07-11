import override from "method-override"; // Importing the 'method-override' module

export const overrideMiddleware = override(function (req, res) { // Creating the overrideMiddleware function using the 'method-override' module
    if (req.body && typeof req.body === 'object' && '_method' in req.body) { // Checking if the request body exists, is an object, and contains the '_method' property
        let method = req.body._method; // Extracting the value of the '_method' property from the request body
        delete req.body._method; // Deleting the '_method' property from the request body
        return method; // Returning the extracted method value
    }
});
