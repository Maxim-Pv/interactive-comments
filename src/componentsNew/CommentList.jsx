import React, { useState } from 'react'
import Reply from './Reply';

const CommentList = ({ comments }) => {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  return (
    <div>
      { comments.map((comment, index) => (
            <div key={comment.id}>
              <div className="comments" >
                <div className="comment-container">
                  <img className="avatar" src={comment.user.image.webp} alt="avatar"></img>
                  <div>
                    <div className="comment-heading">
                      <div>
                        <span className="userName">{comment.user.username}</span>
                        <span className="created">{comment.createdAt}</span>
                      </div>
                      <button className="replyButton" onClick={() => handleReply(comment.id)}>
                        <span className="replyImg"></span>
                        <span>Reply</span>
                      </button>
                    </div>
                    <p className="text">{comment.content}</p>
                    <div className="likes">
                      {/* <button
                        className={!likesState[index].liked ? 'likeButton' : 'likeButton active'}
                        onClick={() => handleChangeLikeState(index)}
                      >
                        <span className="likesDigit">{likesState[index].likes}</span>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              {replyingTo === comment.id &&
                <Reply
                  />  
              }
            </div>
          ))
      }
    </div>
  )
}

export default CommentList