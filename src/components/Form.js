import React from 'react'
import Contorl from './Control'
import { withValidator } from '../utilities'

let TextInput = withValidator(vl => /^\s*\S{4,30}\s*$/.test(vl))(Contorl)
let NumberInput = withValidator(vl => /^\s*[1-9][0-9]{0,9}\s*$/.test(vl))(Contorl)
let DateInput = withValidator(vl => /^\s*201[0-9]-(?:1[0-2]|[1-9])-(?:[1-9]|[1-2][0-9]|3[01])\s*$/.test(vl))(Contorl)
export default ({ title, amount, date, submit, cancel }) => {
  let refTitle = React.createRef()
  let refNumber = React.createRef()
  let refDate = React.createRef()
  let handleSubmit = e => {
    e.preventDefault()
    let titleCL = refTitle.current.classList
    let numberCL = refNumber.current.classList
    let dateCL = refDate.current.classList
    if([titleCL, numberCL, dateCL].every(cl => [].includes.call(cl, 'is-valid'))) {
      submit(refTitle.current.value, refNumber.current.value, refDate.current.value)
    }
  }
  let handleCancel = () => cancel()
  return (
    <form onSubmit={handleSubmit}>
      <div className="row form-group">
        <label htmlFor="title" className="col-sm-2 form-label">Title: </label>
        <div className="col-sm-10">
          <TextInput ref={refTitle} value={title} />
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="amount" className="col-sm-2 form-label">Amount: </label>
        <div className="col-sm-10">
          <NumberInput ref={refNumber} value={amount} />
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="date" className="col-sm-2 form-label">Date: </label>
        <div className="col-sm-10">
          <DateInput ref={refDate} value={date} />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">提交</button>
      <button className="btn btn-secondary ml-3" type="button" onClick={handleCancel}>取消</button>
    </form>
  )
}