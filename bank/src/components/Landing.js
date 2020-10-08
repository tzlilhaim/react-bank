import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../styles/landing.css"

class Landing extends Component {
  render() {
    return (
      <div id="home">
        <h1>Welcome to React Bank</h1>
        <div className="main">
          <div>
            <Link to={"/transactions"}>
              <h2>Transactions</h2>
              <div className="overlay">
                <div className="call-to-action">
                  Manage your transactions in the Transactions page
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link to={"/operations"}>
              <h2>Operations</h2>
              <div className="overlay">
                <div className="call-to-action">
                  Make operations in the Operations page
                </div>
              </div>
            </Link>
          </div>
          {this.props.showBreakdown ? (
            <div>
              <Link to={"/breakdown"}>
                <h2>Breakdown</h2>
                <div className="overlay">
                  <div className="call-to-action">
                    Check your transactions breakdown reports in the Breakdown
                    page
                  </div>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Landing
