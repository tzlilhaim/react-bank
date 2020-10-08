import React, { Component } from "react"
import Transaction from "./Transaction"
import { Link } from "react-router-dom"
import "../styles/transactionsTable.css"
import moment from "moment"
const today = moment().format("YYYY/MM/DD")
const currYear = moment(today).format("Y")
const currMonth = moment(today).format("M")

class TransactionsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [...this.props.transactions],
      isFiltered: { month: false, year: false },
      month: currMonth,
      year: currYear,
    }
  }
  applyFilters = () => {
    let filteredTransactions = [...this.props.transactions]
    filteredTransactions.forEach((t, index) => {
      let tMonth = moment(t.date, "YYYY/MM/DD").format("M")
      let tYear = moment(t.date, "YYYY/MM/DD").format("Y")
      if (this.state.isFiltered.month) {
        if (this.state.isFiltered.year) {
          t["isFilteredIn"] =
            tYear === this.state.year && tMonth === this.state.month
        } else {
          t["isFilteredIn"] = tMonth === this.state.month
        }
      } else if (this.state.isFiltered.year) {
        t["isFilteredIn"] = tYear === this.state.year
      }
    })
    this.setState({ transactions: filteredTransactions })
  }
  handleInputChange = async (event) => {
    const target = event.target
    let value = target.value
    const type = target.type
    const name = target.name.split("-")[1]
    if (type === "checkbox") {
      let filtered = { ...this.state.isFiltered }
      filtered[name] = !this.state.isFiltered[name]
      this.setState({ isFiltered: filtered }, () => {
        this.applyFilters()
      })
    } else {
      if (name === "date") {
        value = target.checked
      } else {
        parseInt(value)
      }
      this.setState({ [name]: value }, () => {
        if (this.state.isFiltered[name]) {
          this.applyFilters()
        }
      })
    }
  }
  render() {
    return this.props.transactions.length ? (
      <div>
        <div id="filters">
          <div className="filter-option">
            <input
              type="checkbox"
              className="month"
              name="filter-month"
              onChange={this.handleInputChange}
              checked={this.state.isFiltered.month}
            ></input>
            <span className="month">Month</span>
            <div className="filter-input">
              <input
                type="number"
                name="input-month"
                className="month"
                value={this.state.month}
                min={1}
                max={12}
                onChange={this.handleInputChange}
                disabled={!this.state.isFiltered.month}
              ></input>
            </div>
          </div>
          <div className="filter-option">
            <input
              type="checkbox"
              className="year"
              name="filter-year"
              checked={this.state.isFiltered.year}
              onChange={this.handleInputChange}
            ></input>
            <span className="year">Year</span>
            <div className="filter-input">
              <input
                type="number"
                name="input-year"
                className="year"
                min="1950"
                max={currYear}
                value={this.state.year}
                onChange={this.handleInputChange}
                disabled={!this.state.isFiltered.year}
              ></input>
            </div>
          </div>
        </div>
        <table className="transactions-table">
          <tbody>
            <tr>
              <th className="amount">Amount</th>
              <th className="vendor">Vendor</th>
              <th className="category">Category</th>
              <th className="date">Date</th>
            </tr>
            {this.state.isFiltered.year || this.state.isFiltered.month
              ? this.state.transactions
                  .filter((t) => {
                    return t.isFilteredIn
                  })
                  .map((t, index) => {
                    return (
                      <Transaction
                        key={`transaction-${index}`}
                        transaction={t}
                        deleteTransaction={this.props.deleteTransaction}
                      />
                    )
                  })
              : this.props.transactions.map((t, index) => {
                  return (
                    <Transaction
                      key={`transaction-${index}`}
                      transaction={t}
                      deleteTransaction={this.props.deleteTransaction}
                    />
                  )
                })}
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        There aren't any transactions yet. To make operations, go to the{" "}
        <Link to={"/operations"}>Operations</Link> page{" "}
      </div>
    )
  }
}

export default TransactionsTable
