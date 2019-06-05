import React from 'react'
import DatePicker from './DatePicker'
export default ({ income, expenses, ...others }) => (
  <div className="row align-items-center">
    <div className="col-sm-2">
      选择日期：
    </div>
    <div className="col-sm-6">
      <DatePicker {...others} />
    </div>
    <div className="col-sm header">
      总收入：
      <strong>
        {income}
      </strong>
      {' '}元
    </div>
    <div className="col-sm header">
      总支出：
      <strong>
        {expenses}
      </strong>
      {' '}元
    </div>
  </div>
)