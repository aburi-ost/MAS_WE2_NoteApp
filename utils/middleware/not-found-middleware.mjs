export const notFound = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(404).send('Nix da!')
}
