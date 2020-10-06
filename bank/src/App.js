import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logo from "./logo.svg"
import "./App.css"
import Transactions from "./components/Transactions"
import Operations from "./components/Operations"
import Landing from "./components/Landing"

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [
        { id: 0, amount: 3200, vendor: "Elevation", category: "Salary" },
        { id: 1, amount: -7, vendor: "Runescape", category: "Entertainment" },
        { id: 2, amount: -20, vendor: "Subway", category: "Food" },
        { id: 3, amount: -98, vendor: "La Baguetterie", category: "Food" },
      ],
    }
  }
  deleteTransaction = (id) => {
    const transactions = [...this.state.transactions]
    transactions.splice(
      transactions.findIndex((t) => t.id === id),
      1
    )
    this.setState({ transactions: transactions })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div id="main-links">
            <Link to={"/"}>Home</Link>
            <Link to={"/transactions"}>Transactions</Link>
            <Link to={"/operations"}>Operations</Link>
          </div>
          <Route exact path="/" render={() => <Landing />} />
          <Route
            exact
            path="/transactions"
            render={() => (
              <Transactions
                deleteTransaction={this.deleteTransaction}
                transactions={this.state.transactions}
              />
            )}
          />
          <Route
            exact
            path="/operations"
            render={() => <Operations operations={this.state.operations} />}
          />
        </div>
      </Router>
    )
  }
}

export default App
