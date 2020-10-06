const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const api = require("./server/routes/api")
const config = require("./config")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/", api)

const port = config.serverPort
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
