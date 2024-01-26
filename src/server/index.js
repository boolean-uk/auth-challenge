// Load our .env file
import { config } from "dotenv";
config();

import app from "./server.js";

// Start our API server
const port = process.env.VITE_PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
