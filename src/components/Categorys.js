import React from 'react'
export default ({ categorys, cid, handleClick }) => (
  <div className="d-flex justify-content-around">
    {categorys.map(category => (
      <button
        key={category.id}
        className={`btn rounded-pill ${
          category.id === cid ?
          'btn-primary' :
          'btn-secondary'
        }`}
        onClick={() => handleClick(category.id)}
      >
        {category.text} 
      </button>
    ))}
  </div>
)