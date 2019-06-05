import React from 'react'
import Header from '../components/Header'
import { Tab, Tabs } from '../components/Tabs'
import List from '../components/List'
import CreateBtn from '../components/CreateBtn'
import { ViewTypes, CateTypes, withContext } from '../utilities'

class Home extends React.Component {
  state = {
    view: ViewTypes.VIEW_LIST
  }
  changeView = index => this.setState({view: ViewTypes[Object.keys(ViewTypes)[index]]})
  createItem = () => this.props.history.push('/create')
  editItem = id => this.props.history.push(`/edit/${id}`)
  deleteItem = id => this.props.actions.deleteItem(id)
  changeDate = (year, month) => this.props.actions.changeDate(year, month)
  render() {
    let { items, categorys, date, isLoading } = this.props.state
    items = [...items.values()]
    let [income, expenses] = items.reduce((ary, item) => {
      categorys.get(item.cid).type === CateTypes.CATE_INCOME ?
      ary[0] += item.amount :
      ary[1] += item.amount
      return ary
    }, [0, 0])
    let itemsWidthCategory = items.map(item => ({
      ...item,
      category: categorys.get(item.cid).text,
      amount: `${
        categorys.get(item.cid).type === CateTypes.CATE_INCOME ?
        '+' : '-'
      }${item.amount}`,
      date: `${item.date.year}-${item.date.month}-${item.date.day}`
    }))
    let index = Object.keys(ViewTypes).indexOf(this.state.view)
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <Header income={income} expenses={expenses} year={date.year} month={date.month} pickDate={this.changeDate} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <CreateBtn onClick={this.createItem} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <Tabs index={index} changeTab={this.changeView}>
              <Tab>列表模式</Tab>
              <Tab>图表模式</Tab>
            </Tabs>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            {
              isLoading
              ? <h1>Loading</h1>
              : this.state.view === ViewTypes.VIEW_LIST
              ? <List items={itemsWidthCategory} editItem={this.editItem} deleteItem={this.deleteItem} />
              : '(╯‵□′)╯︵┻━┻(╯‵□′)╯︵┻━┻(╯‵□′)╯︵┻━┻'
            }
          </div>
        </div>
      </div>
    )
  }
}
export default withContext(Home)


// function cury(fn) {
//   return (...args) => {
//     if(args.length > fn.length) {
//       return fn(...args)
//     }
//     return cury(fn.bind(null, ...args))
//   }
// }
// Promise.prototype.all = arr => new Promise((rs, rj) => {
//   let rst = []
//   let cnt = 0
//   for(let i; i < arr.length; i++) {
//     arr[i]((err, data) => {
//       if(err) {
//         rj(err)
//       }
//       rst[i] = data
//       cnt++
//       if(cnt === arr.length) {
//         rs(rst)
//       }
//     })
//   }
// })