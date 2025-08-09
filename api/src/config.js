const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";

console.log({ PORT, MONGO_URI });

module.exports = {
  PORT,
  MONGO_URI,
};
