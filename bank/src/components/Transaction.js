import React, { Component } from "react"
//import "../../styles/transaction.css"

class Landing extends Component {
  deleteThisTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id)
  }
  render() {
    return (
      <tr className="transaction">
        <td className="amount">{this.props.transaction.amount}</td>
        <td className="vendor">{this.props.transaction.vendor}</td>
        <td className="category">{this.props.transaction.category}</td>
        <td>
          <button onClick={this.deleteThisTransaction} className="delete">
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default Landing
