export const notFound = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(404).send('Invalid page request')
}
