import React, { useState } from 'react'

const UserComment = ({ avatar, addComment, userName }) => {

  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() === '') {
        return 
    } else {
      
        const newComment = {
          id: Date.now(),
          content: comment,
          createdAt: "now",
          score: 0,
          user: {
            image: { 
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: userName,
          },
          replies: []
        };

        addComment(newComment)
        setComment('')
      }
  }


  return (
    <div className="comments currentUser-content">
      <img className="avatar currentUser-avatar" src={avatar} alt="avatar"></img>
      <textarea
        className="currentUser-text editedText editedText-currentUser375"
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
  
      <button className="btn-send" onClick={handleSubmit}>
        SEND
      </button>
    </div>
  )
}

export default UserComment