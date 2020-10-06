import React, { Component } from "react"
//import "../../styles/transactions.css"

class Operations extends Component {
  render() {
    return (
      <div id="operations-page">
        <div className="form">
          <div className="form-field">
            <label for="amount-input">Amount: </label>
            <input
              type="text"
              id="amount-input"
              name="amount-input"
              pattern="^[-]?[0-9]*\.?[0-9]+$"
              title="Operation amount"
            />
          </div>
          <div className="form-field">
            <label for="vendor-input">Vendor: </label>
            <input
              type="text"
              id="vendor-input"
              name="vendor-input"
              pattern="^[a-zA-Z0-9_.- ]*$"
              title="Operation vendor"
            />
          </div>
          <div className="form-field">
            <label for="category-input">Category: </label>
            <input
              type="text"
              id="category-input"
              name="category-input"
              pattern="^[a-zA-Z0-9_.- ]*$"
              title="Operation category"
            />
          </div>
          <button className="deposit">Deposit</button>
          <button className="withdraw">Withdraw</button>
        </div>
      </div>
    )
  }
}

export default Operations
