import React from 'react'
export default ({ show, changeShow }) => {
  return (
    <ul className="nav nav-tabs nav-fill">
      <li className="nav-item">
        <a
          href="#"
          className={`nav-link ${show === 'list' && 'active'}`}
          onClick={() => changeShow('list')}
        >
          列表
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#"
          className={`nav-link ${show === 'chart' && 'active'}`}
          onClick={() => changeShow('chart')}
        >
          图表
        </a>
      </li>
    </ul>
  )
}