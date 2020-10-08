import React, { Component } from "react"
import "../styles/balance.css"

class Balance extends Component {
  render() {
    return (
      <h2 id="balance" data-is-balanced={this.props.balance > 500}>
        Balance: {this.props.balance}$
      </h2>
    )
  }
}

export default Balance
