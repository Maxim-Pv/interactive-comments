import React, { useEffect, useState } from 'react'

const ReplyTo = ({ 
  commentUserName, commentId, commentIndex, 
  replyId, userName, userAvatar, 
  addReplyToComment, addReplyToReply, 
  isReplying, setIsReplying, 
  isReplyingToReply, setIsReplyingToReply, 
  isEditing, setIsEditing,  
  editContentId, setEditContentId,
  contentToEdit, setContentToEdit,
  toEditContent }) => {

  const [commentUserReply, setCommentUserReply] = useState(commentUserName ? `@${commentUserName}, `: '' );
  const [editContent, setEditContent] = useState('contentedit');

  const handleChange = (event) => {
    setCommentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    if (commentUserReply.trim() ===  `@${commentUserName}, `.trim() || 
        commentUserReply.trim() === '') {
        return 
    } else {
      setEditContent(commentUserReply)
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
    }
    setCommentUserReply(commentUserReply.substring(`@${commentUserName}, `.length))
    setEditContentId(null)
    setEditContent(commentUserReply)
    setIsEditing(false)
    // setCommentUserReply(commentUserName ? `@${commentUserName}, `: '')
  }

  const handleUpdate = () => {
    console.log(commentUserReply);
    // setCommentUserReply(editContent)
    // setEditContentId(null)
    console.log('handleUpdate');
  }

  console.log(editContent + ' edit');
  console.log(commentUserReply + '  ReplyTo commentUserReply '); 
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
      {isEditing &&
        <div className="currentUser-content update-content">
          <textarea
            className="currentUser-text editedText"
            value={editContent ? editContent : 'content'}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="btn-send" onClick={handleUpdate}>
            UPDATE
          </button> 
        </div>
      }

    </div>
    
  )
}

export default ReplyTo

// пропадает ответ при попытке редактировать 