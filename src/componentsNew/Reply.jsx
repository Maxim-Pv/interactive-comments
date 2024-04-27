import React, { useEffect, useState } from 'react'

const Reply = () => {
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.setItem('currentUser', JSON.stringify(currentUserData))
    setCurrentUser(currentUserData);
    console.log(currentUserData);
  }, []);

  console.log(currentUser);

  return (
    <div className="comments currentUser-content">
      <img  className="avatar"  alt="avatar"></img>
      <textarea
        className="currentUser-text editedText"

      />
  
      <button className="btn-send" >
        {/* {userName ? 'REPLY' : 'SEND'} */}
      </button>
    </div>
  )
}

export default Reply