import React, { useState } from 'react'

const ReplyTo = ({ commentUserName, commentId, commentIndex, replyId, userName, 
  userAvatar, addReplyToComment, addReplyToReply, isReplying, setIsReplying, 
  isReplyingToReply, setIsReplyingToReply }) => {

  const [commentUserReply, setCommentUserReply] = useState('');
  
  const handleChange = (event) => {
    setCommentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    if (commentUserReply.trim() ===  `@${commentUserName}, `.trim()) {
      return 
    } else {
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

      // setCommentUserReply(commentUserReply.substring(`@${commentUserName}, `.length));
      
      if (isReplying) {
        addReplyToComment(commentId, newReply);
        setIsReplying(false)
      }
      if (isReplyingToReply) {
        addReplyToReply(commentIndex, commentId, replyId, newReply)
        setIsReplyingToReply(false)
      }
    }
  }


  return (
    <div>
      {(isReplying || isReplyingToReply) &&  
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