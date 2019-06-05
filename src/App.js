import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './containers/Home'
import Record from './containers/Record'
import { getFlattenById, getId } from './utilities'
import AppContext from './AppContext'

class App extends React.Component {
  state = {
    isLoading: true,
    items: new Map(),
    categorys: new Map(),
    date: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1
    }
  }
  async componentDidMount() {
    let getItemsUrl = `/items?date.year=${this.state.date.year}&date.month=${this.state.date.month}&_sort=date.day&_order=desc`
    let getCategorysUrl = `/categorys`
    let [items, categorys] = await Promise.all([axios.get(getItemsUrl), axios.get(getCategorysUrl)])
    this.setState({
      isLoading: false,
      items: getFlattenById(items.data),
      categorys: getFlattenById(categorys.data)
    })
  }
  actions = {
    addItem: async data => {
      let id = getId()
      let [year, month, day] = data.date.split('-').map(Number)
      this.setState({isLoading: true})
      let item = await axios.post(`/items`, {
        id,
        title: data.title,
        amount: data.amount,
        cid: data.cid,
        date: { year, month, day }
      })
      this.setState({
        isLoading: false,
        items: new Map([...this.state.items.entries(), [id, item.data]])
      })
    },
    updateItem: async data => {
      let [year, month, day] = data.date.split('-').map(Number)
      this.setState({isLoading: true})
      let res = await axios.patch(`/items/${data.id}`, {...data, date: {year, month, day}})
      this.setState({
        isLoading: false,
        items: new Map([...this.state.items.entries()].map(entry => (
          entry[0] === res.data.id ?
          [res.data.id, res.data] :
          entry
        )))
      })
    },
    deleteItem: async id => {
      this.setState({isLoading: true})
      await axios.delete(`/items/${id}`)
      this.setState({
        isLoading: false,
        items: new Map([...this.state.items.entries()].filter(entry => entry[0] !== id))
      })
    },
    changeDate: async (year, month) => {
      let getItemsUrl = `/items?date.year=${year}&date.month=${month}&_sort=date.day&_order=desc`
      this.setState({isLoading: true})
      let res = await axios.get(getItemsUrl)
      this.setState({
        isLoading: false,
        items: getFlattenById(res.data),
        date: { year, month }
      })
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Record} />
          <Route path="/edit/:id" component={Record} />
        </BrowserRouter>
      </AppContext.Provider>
    )
  }
}

export default App
