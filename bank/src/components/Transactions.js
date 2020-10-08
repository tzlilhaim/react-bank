import React, { Component } from "react"
import TransactionsTable from "./TransactionsTable"
import Balance from "./Balance"
import "../styles/transactions.css"

class Transactions extends Component {
  setAsActiveTab = () => {
    this.props.setActiveTab("transactions")
  }
  render() {
    if (!this.props.isActiveTab) {
      this.setAsActiveTab()
    }
    return (
      <div id="transactions-page">
        <Balance balance={this.props.balance} />
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
