import React from 'react'
import { FaTimes } from 'react-icons/fa'
import '../../../css/DialogStyle/Model.css'
const ImageModel = ({show,onClose,imageUrl}) => {
    if(!show)
        return null
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
                    <FaTimes size={20} />
                </button>
                <img src={imageUrl} alt="Driving License" className="modal-image" />


        </div>
    </div>
  )
}

export default ImageModel