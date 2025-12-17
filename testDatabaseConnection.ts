import { register } from "tsconfig-paths";
import { resolve } from "path";

register({
  baseUrl: resolve(__dirname),
  paths: {
    "@/*": ["./*"]
  }
});

import { connect } from "./lib/db";
import User from "./models/User";

(async () => {
  try {
    await connect();
    const user = await User.findOne({ username: "testuser" });
    console.log("User found:", user);
  } catch (error) {
    console.error("Error connecting to database:", error);
  } finally {
    process.exit();
  }
})();