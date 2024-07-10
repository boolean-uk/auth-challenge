import { config } from 'dotenv';
config();

import app from './server.js';

console.log(`VITE_PORT: ${process.env.VITE_PORT}`)

// Start our API server
const port = process.env.VITE_PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
