import React, { Component } from "react"
import { Link } from "react-router-dom"
//import "../../styles/landing.css"

class Landing extends Component {
  render() {
    return (
      <div id="home">
        <h1>Bank</h1>
        <Link to={"/transactions"}>Transactions</Link>
        <Link to={"/operations"}>Operations</Link>
      </div>
    )
  }
}

export default Landing
