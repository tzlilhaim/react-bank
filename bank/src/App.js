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
      balance: 0,
      activeTab: "home",
    }
  }
  getTransactions = async () => {
    return axios.get(`http://localhost:${SERVER_PORT}/transactions`)
  }
  async componentDidMount() {
    const transactions = await this.getTransactions()
    this.setState({ transactions: transactions.data }, () => {
      let sum = 0
      this.state.transactions.forEach((t) => {
        sum += t.amount
      })
      this.setState({ balance: sum })
    })
  }
  addTransaction = async (data) => {
    const { amount, vendor, category, date } = data
    const newTransaction = {
      amount,
      vendor,
      category,
      date,
    }
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
  setActiveTab = (tabName) => {
    this.setState({ activeTab: tabName })
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
            <Link
              to={"/"}
              className={
                this.state.activeTab === "home" ? "active-tab" : "inactive-tab"
              }
            >
              Home
            </Link>
            <Link
              to={"/transactions"}
              className={
                this.state.activeTab === "transactions"
                  ? "active-tab"
                  : "inactive-tab"
              }
            >
              Transactions
            </Link>
            <Link
              to={"/operations"}
              className={
                this.state.activeTab === "operations"
                  ? "active-tab"
                  : "inactive-tab"
              }
            >
              Operations
            </Link>
            {this.state.transactions.length ? (
              <Link
                to={"/breakdown"}
                className={
                  this.state.activeTab === "breakdown"
                    ? "active-tab"
                    : "inactive-tab"
                }
              >
                Breakdown
              </Link>
            ) : null}
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <Landing
                showBreakdown={this.state.transactions.length > 0}
                setActiveTab={this.setActiveTab}
                isActiveTab={this.state.activeTab === "home"}
                balance={this.state.balance}
              />
            )}
          />
          <Route
            exact
            path="/transactions"
            render={() => (
              <Transactions
                deleteTransaction={this.deleteTransaction}
                transactions={this.state.transactions}
                setActiveTab={this.setActiveTab}
                isActiveTab={this.state.activeTab === "transactions"}
                balance={this.state.balance}
              />
            )}
          />
          <Route
            exact
            path="/operations"
            render={() => (
              <Operations
                addTransaction={this.addTransaction}
                setActiveTab={this.setActiveTab}
                isActiveTab={this.state.activeTab === "operations"}
                balance={this.state.balance}
              />
            )}
          />
          <Route
            exact
            path="/breakdown"
            render={() => (
              <Breakdown
                transactions={this.state.transactions}
                deleteTransaction={this.deleteTransaction}
                setActiveTab={this.setActiveTab}
                isActiveTab={this.state.activeTab === "breakdown"}
                balance={this.state.balance}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
