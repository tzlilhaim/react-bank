import React, { Component } from "react"
import Category from "./Category"
import "../styles/breakdown.css"

class Breakdown extends Component {
  render() {
    const categories = []
    this.props.transactions.forEach((transaction) => {
      if (!categories.includes(transaction.category.toLowerCase())) {
        categories.push(transaction.category.toLowerCase())
      }
    })
    return (
      <div id="breakdown-page">
        <h2>Transactions Breakdown</h2>
        {categories.length ? (
          <div id="categories">
            <table>
              <tbody>
                <tr>
                  <th className="category-title">Category</th>
                  <th className="total">Total</th>
                  <th>Report</th>
                </tr>
                {categories.map((category, index) => {
                  let total = 0,
                    transactions = []
                  this.props.transactions.forEach((t) => {
                    if (t.category.toLowerCase() === category) {
                      transactions.push(t)
                      total += t.amount
                    }
                  })
                  return (
                    <Category
                      key={`category-${index}`}
                      category={category}
                      transactions={transactions}
                      total={total}
                      deleteTransaction={this.props.deleteTransaction}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    )
  }
}

export default Breakdown
