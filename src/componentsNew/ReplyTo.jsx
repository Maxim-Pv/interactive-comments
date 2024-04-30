import React, { useState } from 'react'

const ReplyTo = ({ commentUserName, commentId, userName, 
  userAvatar, addReplyToComment, isReplying, setIsReplying }) => {

  const [commentUserReply, setCommentUserReply] = useState(commentUserName ? `@${commentUserName}, `: '');
  
  const handleChange = (event) => {
    setCommentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    const newReply = {
      id: Date.now(),
      content: commentUserReply,
      createdAt: "now",
      score: 0,
      replyingTo: commentUserName,
      user: {
        image: { 
          webp: "./images/avatars/image-juliusomo.webp"
        },
        username: userName,
      }
    };
    addReplyToComment(commentId, newReply);
    setIsReplying(false)
  }


  return (
    <div>
      {isReplying && 
        (<div style={{marginTop: -10 }} className="comments currentUser-content">
          <img className="avatar" src={userAvatar} alt="avatar"></img>
          <textarea
            className="currentUser-text editedText"
            value={commentUserReply}
            onChange={handleChange}
          />
          <button className="btn-send" onClick={handleSubmit}>
            REPLY
          </button>
        </div>)
      }
    </div>
    
  )
}

export default ReplyTo