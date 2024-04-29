import React from 'react'

const UserComment = ({ avatar }) => {
  return (
    <div className="comments currentUser-content">
      <img className="avatar" src={avatar} alt="avatar"></img>
      <textarea
        className="currentUser-text editedText"
       
      />
  
      <button className="btn-send">
        SEND
      </button>
    </div>
  )
}

export default UserComment