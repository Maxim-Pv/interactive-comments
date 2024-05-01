import React, { useState } from 'react'

const ReplyTo = ({ commentUserName, commentId, commentIndex, replyId, userName, 
  userAvatar, addReplyToComment, addReplyToReply, isReplying, setIsReplying, 
  isReplyingToReply, setIsReplyingToReply, isEditing, setIsEditing }) => {

  const [commentUserReply, setCommentUserReply] = useState(`@${commentUserName}, `);
  const [editedContent, setEditedContent] = useState(commentUserReply);
  
  const handleChange = (event) => {
    setCommentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    if (commentUserReply.trim() ===  `@${commentUserName}, `.trim() || 
        commentUserReply.trim() === '') {
        return 
    } else {

      console.log(commentUserReply);
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
      
      if (isReplying) {
        addReplyToComment(commentId, newReply);
        setIsReplying(false)
      }
      if (isReplyingToReply) {
        addReplyToReply(commentIndex, commentId, replyId, newReply)
        setIsReplyingToReply(false)
      }

      if (isEditing) {
        setIsEditing(false)
      }
    }
    setCommentUserReply(`@${commentUserName}, `)

  }

  // const handleUpdate = () => {

  // }


  return (
    <div>
      {(isReplying || isReplyingToReply) &&  
        (<div style={{marginTop: -10 }} className="comments currentUser-content">
          <img className="avatar" src={userAvatar} alt="avatar"></img>
          {!isEditing 
            ? <>
                <textarea
                  className="currentUser-text editedText"
                  value={commentUserReply}
                  onChange={handleChange}
                />
                <button className="btn-send" onClick={handleSubmit}>
                  REPLY
                </button>
              </>
            : <>
                <textarea
                  className="currentUser-text editedText"
                  value={commentUserReply}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button className="btn-send" onClick={handleSubmit}>
                  UPDATE
                </button>
              </>
            
          }
        </div>)
      }
    </div>
    
  )
}

export default ReplyTo


// Убрать `@${commentUserName}, ` в handleSubmit