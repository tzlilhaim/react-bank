import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from "axios"
import "./styles/App.css"
import { Snackbar, IconButton } from "@material-ui/core"
import Transactions from "./components/Transactions"
import Operations from "./components/Operations"
import Landing from "./components/Landing"
import Breakdown from "./components/Breakdown"
const SERVER_PORT = 5000

class App extends Component {
  constructor() {
    super()
    this.state = {
      snackBarOpen: false,
      snackBarMsg: "",
      transactions: [],
    }
  }
  getTransactions = async () => {
    return axios.get(`http://localhost:${SERVER_PORT}/transactions`)
  }
  async componentDidMount() {
    const transactions = await this.getTransactions()
    this.setState({ transactions: transactions.data })
  }
  addTransaction = async (data) => {
    const { amount, vendor, category } = data
    const newTransaction = { amount, vendor, category }
    axios
      .post(`http://localhost:${SERVER_PORT}/transaction`, newTransaction)
      .then((updatedTransactions) => {
        this.setState({
          transactions: updatedTransactions.data,
          snackBarOpen: true,
          snackBarMsg: "Added transaction successfully!",
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  deleteTransaction = async (id) => {
    axios
      .delete(`http://localhost:${SERVER_PORT}/transaction/${id}`)
      .then((updatedTransactions) => {
        this.setState({
          transactions: updatedTransactions.data,
          snackBarOpen: true,
          snackBarMsg: "Removed transaction successfully!",
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Snackbar
            open={this.state.snackBarOpen}
            autoHideDuration={3000}
            onClose={this.snackBarClose}
            message={<span id="snackbar-msg">{this.state.snackBarMsg}</span>}
            action={
              <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.snackBarClose}
              >
                x
              </IconButton>
            }
          />
          <div id="main-links">
            <Link to={"/"}>Home</Link>
            <Link to={"/transactions"}>Transactions</Link>
            <Link to={"/operations"}>Operations</Link>
            {this.state.transactions.length ? (
              <Link to={"/breakdown"}>Breakdown</Link>
            ) : null}
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <Landing showBreakdown={this.state.transactions.length > 0} />
            )}
          />
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
          <Route
            exact
            path="/breakdown"
            render={() => (
              <Breakdown
                transactions={this.state.transactions}
                deleteTransaction={this.deleteTransaction}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
