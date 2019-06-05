import React from 'react'
export default ({ items, editItem, deleteItem }) => (
  <ul className="list-group">
    {items.map(item =>(
      <li
        className="list-group-item"
        key={item.id}
      >
        <div className="row align-items-center">
          <div className="col-sm-1">
            <span className="badge badge-primary">
              {item.category}
            </span>
          </div>
          <div className="col-sm-6">
            {item.title}
          </div>
          <div className="col-sm-1">
            <strong>
              {item.amount}
            </strong>
          </div>
          <div className="col-sm-2">
            {item.date}
          </div>
          <div className="col-sm-1">
            <button className="btn btn-success btn-sm" onClick={() => editItem(item.id)}>
              编辑
            </button>
          </div>
          <div className="col-sm-1">
            <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
              删除
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
)