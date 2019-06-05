import React from 'react'
export default React.forwardRef(({ value='', validator }, forwardedRef) => {
  let [vl, setVl] = React.useState(value)
  return (
    <input
      type="text"
      className={`form-control ${
        validator(vl) ?
        'is-valid' :
        'is-invalid'
      }`}
      ref={forwardedRef}
      value={vl}
      onChange={e => setVl(e.target.value)}
    />
  )
})