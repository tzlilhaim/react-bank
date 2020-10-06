const mongoose = require("../db/mongoose")
class Bank {
  constructor() {
    this.Transaction = require("../db/models/Transaction")
  }
  async get() {
    const transactions = await this.Transaction.find({})
    return transactions
  }
  async post(details) {
    const transaction = new this.Transaction(details)
    await transaction.save()
    return this.get()
  }
  async delete(transactionId) {
    await this.city.deleteOne({ _id: transactionId }).exec(function (err) {
      err !== null ? console.log(err) : null
    })
    return this.get()
  }
}

const bank = new Bank()
module.exports = bank
