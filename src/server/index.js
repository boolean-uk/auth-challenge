import app from "./server.js";

// Load our .env file
import { config } from "dotenv";
config();

// Start our API server
const port = process.env.VITE_PORT;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
