import React, { Component } from "react"
import TransactionsTable from "./TransactionsTable"
import "../styles/transactions.css"

class Transactions extends Component {
  render() {
    return (
      <div id="transactions-page">
        <h2>All Transactions</h2>
        <TransactionsTable
          transactions={this.props.transactions}
          deleteTransaction={this.props.deleteTransaction}
        />
      </div>
    )
  }
}

export default Transactions
