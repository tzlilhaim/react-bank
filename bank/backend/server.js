const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const api = require("./server/routes/api")
const config = require("./config")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  )

  next()
})

app.use("/", api)
app.use(cors())

const port = config.serverPort
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
