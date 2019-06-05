import React from 'react'
import { getYearsBy } from '../utilities'
export default class extends React.Component {
  state = {
    isOpen: false,
    year: this.props.year,
    month: this.props.month
  }
  switchOpen = () => this.setState({
    isOpen: !this.state.isOpen,
    year: this.props.year,
    month: this.props.month
  })
  handleBlur = () => {
    this.timer = setTimeout(() => this.setState({
      isOpen: false,
      year: this.props.year,
      month: this.props.month
    }))
  }
  handleFocus = () => clearTimeout(this.timer)
  clickYear = e => this.setState({
    year: Number(e.target.value),
    month: -1
  })
  clickMonth = e => {
    this.setState({
      isOpen: false
    })
    this.props.pickDate(this.state.year, Number(e.target.value))
  }
  render() {
    let { year, month } = this.state
    let years = getYearsBy(this.props.year)
    let months = Array(11).fill(0).reduce(rst => ((rst[rst.length] = rst[rst.length - 1] + 1, rst)), [1])
    return (
      <div className="dropdown" onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <button
          className="btn btn-secondary btn-sm dropdown-toggle"
          onClick={this.switchOpen}
        >
          {this.props.year} - {this.props.month}
        </button>
        {
          this.state.isOpen &&
          <div className="dropdown-menu show">
            <div className="container">
              <div className="row">
                <div className="col-sm border-right">
                  {years.map(y => (
                    <button
                      key={y}
                      className={`dropdown-item btn-sm ${
                        year === y &&
                        'active'
                      }`}
                      value={y}
                      onClick={this.clickYear}
                    >
                      {y} 年
                    </button>
                  ))}
                </div>
                <div className="col-sm">
                  {months.map(m => (
                    <button
                      key={m}
                      className={`dropdown-item btn-sm ${
                        month === m &&
                        'active'
                      }`}
                      value={m}
                      onClick={this.clickMonth}
                    >
                      {m} 月
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}