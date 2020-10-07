import React, { Component } from "react"
import { Link } from "react-router-dom"
//import "../../styles/landing.css"

class Landing extends Component {
  render() {
    return (
      <div id="home">
        <h1>Welcome to React Bank</h1>
        <p>
          Manage your transactions in the{" "}
          <Link to={"/transactions"}>Transactions</Link> page
        </p>
        <p>
          Make operations in the <Link to={"/operations"}>Operations</Link> page
        </p>
        {this.props.showBreakdown ? (
          <p>
            Check your transactions breakdown reports in the{" "}
            <Link to={"/breakdown"}>Breakdown</Link> page
          </p>
        ) : null}
      </div>
    )
  }
}

export default Landing
