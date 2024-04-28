import React, { useEffect, useState } from 'react'

const Reply = ({ userName, commentId }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserReply, setCurrentUserReply] = useState(userName ? `@${userName}, `: '');

  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem('jsonData')) ;
    setCurrentUser(currentUserData);
  }, []);

  const handleChange = (event) => {
    setCurrentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    const storedData = JSON.parse(localStorage.getItem("jsonData"));
      const commentToUpdate = storedData.comments.find(comment => comment.id === commentId);
      const newReply = {
        id: commentToUpdate.replies.length + 1,
        content: currentUserReply,
        createdAt: "now",
        score: 0,
        replyingTo: userName,
        user: currentUser.username
      };
      commentToUpdate.replies.push(newReply);
      localStorage.setItem('usersComments', JSON.stringify(storedData));
      console.log(storedData);
  }

  // src={currentUser.image.webp}
  console.log(currentUser);

  return (
    <div className="comments currentUser-content">
      {/* <img className="avatar" src={currentUser.image?.webp} alt="avatar"></img> */}
      {/* не успевает прогрузиться currentUser */}
      <textarea
        className="currentUser-text editedText"
        value={currentUserReply}
        onChange={handleChange}
      />
  
      <button className="btn-send" onClick={handleSubmit}>
        REPLY
      </button>
    </div>
  )
}

export default Reply