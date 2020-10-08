const express = require("express")
const router = express.Router()
const bank = require("./Bank")

router.get("/health", function (req, res) {
  res.send("healthy")
})

router.get("/transactions", async function (req, res) {
  const transactions = await bank.get()
  res.send(transactions)
})

router.post("/transaction", async function (req, res) {
  const { amount, vendor, category, date } = req.body
  const transactions = await bank.post({ amount, vendor, category, date })
  res.send(transactions)
})

router.delete("/transaction/:id", async function (req, res) {
  const id = req.params.id
  const transactions = await bank.delete(id)
  res.send(transactions)
})

module.exports = router
