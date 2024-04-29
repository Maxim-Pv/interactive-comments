import React from 'react'
import Modal from '../../componentsNew/Modal';

const HeadingContentCurrentUser = ({ userName, handleEdit, handleOpenModal }) => {
  console.log('handleEdit === '); // срабатывает при вводе каждого символа в reply 
  return (
    <div className="replies-heading-content">
        <span className="userName currentUserName">{userName}</span>
        <div className="replies-heading-content withoutName">
          <div>
            <span className="you">you</span>
            <span className="created">now</span>
          </div>
          <div style={{display: 'flex'}}>
            <button style={{marginRight: 20}} className="replyButton" onClick={handleOpenModal}>
              <span className="replyImg deleteImg"></span>
              <span>Delete</span>
            </button>
            <button className="replyButton" onClick={handleEdit}>
              <span className="replyImg editImg"></span>
              <span>Edit</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default HeadingContentCurrentUser