import React, { useEffect, useRef } from 'react'

const Modal = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCancel();
    }
  };

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

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen)
  }

  // if(index){
  //   console.log(index);
  // } 
  const handleDelete = () => {
    // const storedReplies = JSON.parse(localStorage.getItem("usersComments"));
    // const replyToDelete = storedReplies.comments[0].replies[0]
    // if(replyToDelete) {
    //   localStorage.removeItem("usersComments", replyToDelete)
    //   console.log('reply');
    // }
    
    // console.log(replyToDelete);
    // console.log(storedReplies);

    // setIsModalOpen(!isModalOpen)
  }

  // console.log(index);

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