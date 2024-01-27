import app from "./server.js";

// Load our .env file
import { config } from "dotenv";
config();

// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get("*", (req, res) => {
  res.json({ ok: true });
});

// Start our API server
const port = process.env.VITE_PORT;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
