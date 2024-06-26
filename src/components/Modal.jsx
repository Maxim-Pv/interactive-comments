import React, { useEffect, useRef } from 'react'

const Modal = ({ isModalOpen, setIsModalOpen, handleConfirmDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    
  }, [isModalOpen])

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleDelete = () => {
    handleConfirmDelete()
  }


  return (
    <div className={`modal ${isModalOpen ? 'open' : ''}`} >
      <div className="modal-content" ref={modalRef}>
        <h2 className="modal-heading">Delete comment</h2>
        <p className="modal-text">
          Are you sure you want to delete this comment? This will remove the comment and can't be undone.
        </p>
        <div className="modal-container-btns">
          <button className="modal-btn" onClick={handleCancel}>NO, CANСEL</button>
          <button className="modal-btn delete-btn" onClick={handleDelete}>YES, DELETE</button>
        </div>
      </div>
    </div>
  )
}

export default Modal