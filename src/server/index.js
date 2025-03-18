import "dotenv/config";
import { app } from "./server.js";

const port = process.env.VITE_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
