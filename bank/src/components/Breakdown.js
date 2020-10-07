import React, { Component } from "react"
import Category from "./Category"

class Breakdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: this.props.transactions,
      categories: [],
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props !== nextProps) {
      this.setState({ transactions: nextProps.transactions }, () => {
        const categories = []
        this.state.transactions.forEach((transaction) => {
          if (!categories.includes(transaction.category.toLowerCase())) {
            categories.push(transaction.category.toLowerCase())
          }
        })
        this.setState({ categories: categories }, () => {})
      })
    }
  }
  render() {
    return (
      <div id="breakdown-page">
        {this.state.categories.length ? (
          this.state.categories.map((category, index) => {
            let total = 0,
              transactions = []
            this.state.transactions.forEach((t) => {
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
          })
        ) : (
          <p>Nothing to see here...</p>
        )}
      </div>
    )
  }
}

export default Breakdown
