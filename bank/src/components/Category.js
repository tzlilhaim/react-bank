import React, { Component } from "react"
import Transaction from "./Transaction"
import "../styles/category.css"

class Category extends Component {
  deleteThisTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id)
  }
  toggleCollapsible = (btnId) => {
    const btn = document.getElementById(btnId)
    btn.classList.toggle("active")
    const content = btn.nextElementSibling
    if (content.style.display === "block") {
      content.style.display = "none"
    } else {
      content.style.display = "block"
    }
  }
  render() {
    return (
      <tr className="category">
        <td className="category-title">{this.props.category}</td>
        <td className="total">{this.props.total}</td>
        <td>
          <button
            id={`view-report-${this.props.category}`}
            type="button"
            className="collapsible"
            onClick={(e) => this.toggleCollapsible(e.target.id)}
          >
            Transactions report
          </button>
          <div className="content">
            <table>
              <tbody>
                <tr>
                  <th>Amount</th>
                  <th>Vendor</th>
                  <th>Category</th>
                </tr>
                {this.props.transactions.map((t, index) => {
                  return (
                    <Transaction
                      key={`${this.props.category}-${index}`}
                      transaction={t}
                      deleteTransaction={this.props.deleteTransaction}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )
  }
}

export default Category
