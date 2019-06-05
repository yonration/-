import React from 'react'
export let Tabs = ({ children, index, changeTab }) => {
  return (
    <ul className="nav nav-pills nav-fill">
      {React.Children.map(children, (child, idx) => (
        <li className="nav-item">
          <a
            href="/"
            className={`nav-link ${index === idx ? 'active' : ''}`}
            onClick={e => {e.preventDefault();changeTab(idx)}}
          >
            {child}
          </a>
        </li>
      ))}
    </ul>
  )
}
export let Tab = ({ children }) => <>{children}</>