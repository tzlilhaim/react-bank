import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from "axios"
import "./App.css"
import Transactions from "./components/Transactions"
import Operations from "./components/Operations"
import Landing from "./components/Landing"
const SERVER_PORT = 5000

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      idTracker: 4,
    }
  }
  componentDidMount() {
    axios
      .get(`http://localhost:${SERVER_PORT}/transactions`)
      .then((transactions) => {
        console.log(transactions)
        this.setState({ transactions: transactions.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  addTransaction = async (data) => {
    const { amount, vendor, category } = data
    const newTransaction = { amount, vendor, category }
    axios
      .post(`http://localhost:${SERVER_PORT}/transaction`, newTransaction)
      .then((updatedTransactions) => {
        console.log(updatedTransactions)
        this.setState({ transactions: updatedTransactions.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  deleteTransaction = async (id) => {
    axios
      .delete(`http://localhost:${SERVER_PORT}/transaction/${id}`)
      .then((updatedTransactions) => {
        console.log(updatedTransactions)
        this.setState({ transactions: updatedTransactions.data })
      })
      .catch(function (error) {
        console.log(error)
      })
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
            render={() => <Operations addTransaction={this.addTransaction} />}
          />
        </div>
      </Router>
    )
  }
}

export default App
