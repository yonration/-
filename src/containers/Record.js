import React from 'react'
import { Tab, Tabs } from '../components/Tabs'
import Categorys from '../components/Categorys'
import Form from '../components/Form'
import { CateTypes, withContext } from '../utilities'
class Record extends React.Component {
  state = {
    cate: CateTypes.CATE_EXPENSES,
    category: null
  }
  componentDidMount() {
    let id = this.props.match.params.id
    if(id !== undefined) {
      let item = this.props.state.items.get(id)
      this.setState({
        cate: this.props.state.categorys.get(item.cid).type,
        category: item.cid
      })
    }
  }
  changeCate = index => this.setState({cate: CateTypes[Object.keys(CateTypes)[index]]})
  changeCategory = cid => this.setState({category: cid})
  handleSubmit = (title, amount, date) => {
    let item = {
      title,
      date,
      amount: Number(amount),
      cid: this.state.category
    }
    if(this.props.match.params.id !== undefined) {
      item.id = this.props.match.params.id
      this.props.actions.updateItem(item)
    } else {
      this.props.actions.addItem(item)
    }
    this.props.history.push('/')
  }
  handleCancel = () => this.props.history.push('/')
  render() {
    let index = Object.keys(CateTypes).indexOf(this.state.cate)
    let categorys = [...this.props.state.categorys.values()].reduce((ary, category) => {
      category.type === CateTypes.CATE_EXPENSES ?
      ary[0].push(category) :
      ary[1].push(category)
      return ary
    }, [[], []])
    let id = this.props.match.params.id
    let item = this.props.state.items.get(id)
    item
    ? item = {...item, date: `${item.date.year}-${item.date.month}-${item.date.day}`}
    : item = {}
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col">
            <Tabs changeTab={this.changeCate} index={index}>
              <Tab>支出</Tab>
              <Tab>收入</Tab>
            </Tabs>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            {
              this.state.cate === CateTypes.CATE_EXPENSES ?
              <Categorys categorys={categorys[0]} cid={this.state.category} handleClick={this.changeCategory} /> :
              <Categorys categorys={categorys[1]} cid={this.state.category} handleClick={this.changeCategory} />
            }
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <Form history={this.props.history} {...item} submit={this.handleSubmit} cancel={this.handleCancel} />
          </div>
        </div>
      </div>
    )
  }
}
export default withContext(Record)