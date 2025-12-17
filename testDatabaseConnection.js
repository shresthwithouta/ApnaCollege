const { connect } = require("./lib/db");
const User = require("./models/User");

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