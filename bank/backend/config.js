require("dotenv").config({ path: "../.env" })
module.exports = {
  serverPort: process.env.SERVER_PORT,
  mongoDbURI: process.env.MONGODB_URI,
}