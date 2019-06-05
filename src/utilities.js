import React from 'react'
import AppContext from './AppContext'

export let getYearsBy = year => {
  let years = []
  for(let i = -4; i <= 4; i++) {
    years.push(year + i)
  }
  return years
}
export let ViewTypes = {
  VIEW_LIST: 'VIEW_LIST',
  VIEW_CHART: 'VIEW_CHART'
}
export let CateTypes = {
  CATE_EXPENSES: 'CATE_EXPENSES',
  CATE_INCOME: 'CATE_INCOME'
}
export let withValidator = validator => Component => {
  let Enhanced = ({ forWardedRef, ...props }) => <Component {...props} validator={validator} ref={forWardedRef} />
  return React.forwardRef((props, ref) => <Enhanced {...props} forWardedRef={ref} />)
}
export let withContext = Component => props => (
  <AppContext.Consumer>
    {data => <Component {...{...props, ...data}} />}
  </AppContext.Consumer>
)
export let getFlattenById = ary => ary.reduce((map, item) => ((map.set(item.id, item), map)), new Map())
export let getId = () => `_${Math.random().toString(36).slice(2, 9)}`
