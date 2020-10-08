import React, { Component } from "react"
import "../styles/transaction.css"
import moment from "moment"

class Transaction extends Component {
  deleteThisTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id)
  }
  render() {
    return (
      <tr
        className="transaction"
        data-type={this.props.transaction.amount > 0 ? "plus" : "minus"}
      >
        <td className="amount">{this.props.transaction.amount}</td>
        <td className="vendor">{this.props.transaction.vendor}</td>
        <td className="category">{this.props.transaction.category}</td>
        <td className="date">
          {moment(this.props.transaction.date).format("YYYY-MM-DD")}
        </td>
        <td>
          <button onClick={this.deleteThisTransaction} className="delete">
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default Transaction
