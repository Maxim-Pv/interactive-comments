import React, { useState } from 'react'

const CommentList = ({ comments, userName, setIsModalOpen, onDeleteReply }) => {
  // const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleDeleteConfirm = (index, indexR) => {
    onDeleteReply([index, indexR])
    setIsModalOpen(true)
  }

  return (
    <div>
      {comments.map((comment, index) => (
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
                  <button className="replyButton" >
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
{/* Replies to comment start here */}
          <div className="comments-contant replies-content">
            {comment.replies && comment.replies.map((reply, indexR) => (
              <div key={reply.id} className="comments">
                <div className="comment-container">
                  <img className="avatar" src={reply.user.image.webp} alt="avatar"></img>
                  <div>
                    {reply.user.username === userName 
                      ? (<>
                          <div className="replies-heading">
                            <div className="replies-heading-content">
                              <span className="userName currentUserName">{userName}</span>
                              <div className="replies-heading-content withoutName">
                                <div>
                                  <span className="you">you</span>
                                  <span className="created">now</span>
                                </div>
                                <div style={{display: 'flex'}}>
                                  <button style={{marginRight: 20}} className="replyButton" 
                                    onClick={() => handleDeleteConfirm(index, indexR)}
                                  >
                                    <span className="replyImg deleteImg"></span>
                                    <span>Delete</span>
                                  </button>
                                  <button className="replyButton" >
                                    <span className="replyImg editImg"></span>
                                    <span>Edit</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text">
                            <span className="replyingTo">@{reply.replyingTo}</span>
                            {reply.content}
                          </p>
                        </>)
                      : (<>
                          <div className="replies-heading">
                            <div className="reply-userData">
                              <span className="userName">{reply.user.username}</span>
                              <span className="created">{reply.createdAt}</span>
                            </div>
                            <button className="replyButton" >
                              <span className="replyImg"></span>
                              <span>Reply</span>
                            </button>
                          </div> 
                          <p className="text">
                            <span className="replyingTo">@{reply.replyingTo}</span>
                            {reply.content}
                          </p>
                        </>)
                    }
                      
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        ))
      }
    </div>
  )
}

export default CommentList
