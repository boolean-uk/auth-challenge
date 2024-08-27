import app from './server'

// Define the port the server will run on
const port = 3030

// Run the server
app.listen(port, () => {
    console.log(`[SERVER] Running on http://localhost:${port}/`)
})
