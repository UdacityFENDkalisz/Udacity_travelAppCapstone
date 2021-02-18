const app = require('./server')

// Designates what port the app will listen to for incoming requests
const port = 8087
app.listen(port,
    () => console.log(`Travel weather app listening on port ${port}!`)
)