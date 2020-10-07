import React, { Component } from "react"
import Transaction from "./Transaction"
import "../styles/transactions.css"

class Transactions extends Component {
  render() {
    return (
      <div id="transactions-page">
        <h2>All Transactions</h2>
        <table id="transactions">
          <tbody>
            <tr>
              <th className="amount">Amount</th>
              <th className="vendor">Vendor</th>
              <th className="category">Category</th>
            </tr>
            {this.props.transactions.map((t, index) => {
              return (
                <Transaction
                  key={`transaction-${index}`}
                  transaction={t}
                  deleteTransaction={this.props.deleteTransaction}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Transactions
