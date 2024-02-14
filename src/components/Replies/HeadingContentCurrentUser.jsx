import React from 'react'

const HeadingContentCurrentUser = ({ userName, created, handleEdit, handleOpenModal, }) => {
  console.log('handleEdit === ');
  return (
    <div className="replies-heading-content">
        <span className="userName currentUserName">{userName}</span>
        <div className="replies-heading-content withoutName">
          <div>
            <span className="you">you</span>
            <span className="created">{created}</span>
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