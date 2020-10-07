import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import "../styles/operations.css"

class Operations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: "",
      vendor: "",
      category: "",
      patterns: {
        amount: "^[0-9]*(.[0-9]+)?$",
        vendor: "^[a-zA-Z0-9. ]*$",
        category: "^[a-zA-Z0-9. ]*$",
      },
      isOperationDone: false,
    }
  }
  resetInputs = () => this.setState({ amount: "", vendor: "", category: "" })
  makeOperation = (operation) => {
    this.props.addTransaction(operation)
    this.resetInputs()
    this.setState({ isOperationDone: true })
  }
  onBtnClick = (event) => {
    const target = event.target
    const operationType = target.id
    const operation = {
      amount:
        operationType === "withdraw"
          ? 0 - this.state.amount
          : this.state.amount,
      vendor: this.state.vendor,
      category: this.state.category,
    }
    this.makeOperation(operation)
  }

  handleInputChange = (event) => {
    const target = event.target
    let value = target.value
    const name = target.id.split("-")[0]
    if (name === "amount") {
      parseInt(value)
    }
    const pattern = new RegExp(this.state.patterns[name])
    if (pattern.test(value)) {
      this.setState({ [name]: value })
    }
  }

  render() {
    return this.state.isOperationDone ? (
      <Redirect to="/transactions" />
    ) : (
      <div id="operations-page">
        <h2>Make an operation</h2>
        <div id="make-operation">
          <span className="amount">Amount:</span>
          <input
            className="form-field"
            type="text"
            id="amount-input"
            name="amount-input"
            title="Operation amount"
            value={this.state.amount}
            onChange={this.handleInputChange}
          />
          <span className="vendor">Vendor:</span>
          <input
            className="form-field"
            type="text"
            id="vendor-input"
            name="vendor-input"
            title="Operation vendor"
            value={this.state.vendor}
            onChange={this.handleInputChange}
          />
          <span>Category:</span>
          <input
            className="form-field"
            type="text"
            id="category-input"
            name="category-input"
            title="Operation category"
            value={this.state.category}
            onChange={this.handleInputChange}
          />{" "}
          <button id="withdraw" onClick={this.onBtnClick}>
            Withdraw
          </button>
          <button id="deposit" onClick={this.onBtnClick}>
            Deposit
          </button>
        </div>
      </div>
    )
  }
}

export default Operations
