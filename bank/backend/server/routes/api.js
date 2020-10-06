const express = require("express")
const router = express.Router()
const bank = require("./Bank")

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  )

  next()
})

router.get("/health", function (req, res) {
  res.send("healthy")
})

router.get("/transactions", async function (req, res) {
  const transactions = await bank.get()
  res.send(transactions)
})

router.post("/transaction", async function (req, res) {
  const { amount, vendor, category } = req.body
  const transactions = await bank.post({ amount, vendor, category })
  res.send(transactions)
})

router.delete("/transaction", async function (req, res) {
  const id = req.params.id
  const transactions = await bank.delete(id)
  res.send(transactions)
})

module.exports = router
