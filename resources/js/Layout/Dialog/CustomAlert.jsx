import React from 'react'

const CustomAlert = ({isOpen,onClose,title,message}) => {
  return (
    <div className={`custom-alert ${isOpen ? 'open' : ''}`}>
    <div className="custom-alert-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Ok</button>
    </div>
</div>
  )
}

export default CustomAlert