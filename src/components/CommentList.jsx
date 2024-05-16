import React, { useState } from 'react'
import ReplyTo from './ReplyTo';

const CommentList = ({ comments, userName, likesState, handleChangeLikeState, setIsModalOpen, 
  onDeleteReply, userAvatar, updateReply, addReply, updateComment }) => {
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [replyingToReply, setReplyingToReply] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyingToReply, setIsReplyingToReply] = useState(false);

  const [editContentId, setEditContentId] = useState(null);

  const handleReplyToComment = (commentId) => {
    setReplyingToComment((prevReplyingTo) => (prevReplyingTo === commentId ? prevReplyingTo : commentId));
    setIsReplying(true);
  };

  const handleReplyToReply = (replyId) => {
    setReplyingToReply((prevReplyingTo) => (prevReplyingTo === replyId ? prevReplyingTo : replyId))
    setIsReplyingToReply(true)
  }

  const handleDeleteConfirm = (index, indexR) => {
    onDeleteReply([index, indexR])
    setIsModalOpen(true)
  }
  
  const handleEdit = (id) => {
    setEditContentId(id);
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div className="comments" >
            <div className="comment-container">
              <img className={`avatar ${editContentId === comment.id && 'currentUser-avatar'}`} 
                src={comment.user.image.webp} alt="avatar">
              </img>
              <div className='margin-left'>
                  {comment.user.username !== userName 
                    ?
                      (<div>
                        <div className="comment-heading">
                          <div className='user-details'>
                            <span className="userName">{comment.user.username}</span>
                            <span className="created">{comment.createdAt}</span>
                          </div>
                          <button className="replyButton" onClick={() => handleReplyToComment(comment.id)}>
                            <span className="replyImg"></span>
                            <span>Reply</span>
                          </button>
                        </div>
                        <p className="text">{comment.content}</p>
                        <div className="likes">
                          <button
                            className={!likesState[index].liked ? 'likeButton' : 'likeButton active'}
                            onClick={() => handleChangeLikeState(index)}
                          >
                            <span className="likesDigit">{likesState[index].likes}</span>
                          </button>
                        </div>
                      </div>)
                    : 
                      (editContentId === comment.id
                        ? 
                          (<ReplyTo 
                            comment={comment}
                            editContentId={editContentId}
                            setEditContentId={setEditContentId}
                            updateReply={updateComment}
                          />)
                        : 
                          (<div>
                            <div className="replies-heading">
                              <div className="replies-heading-content">
                                    <span className="userName currentUserName">{userName}</span>
                                  <div className="replies-heading-content withoutName">
                                  <div className='reply-user-details'>
                                    <span className="you">you</span>
                                    <span className="created">now</span>
                                  </div>
                                  <div style={{display: 'flex'}}>
                                    <button className="replyButton btn-delete-comment" 
                                      onClick={() => handleDeleteConfirm(index, null)}
                                    >
                                      <span className="replyImg deleteImg"></span>
                                      <span>Delete</span>
                                    </button>
                                    <button className="replyButton" onClick={() => handleEdit(comment.id)}>
                                      <span className="replyImg editImg"></span>
                                      <span>Edit</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text">{comment.content}</p>

               

                          </div>)
                      )
                  }
              </div>
            </div>
          </div>

          {replyingToComment === comment.id &&
            <ReplyTo 
              commentId={comment.id}
              commentUserName={comment.user.username}
              userName={userName}
              userAvatar={userAvatar}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
              addReply={addReply}

              setEditContentId={setEditContentId}
            />
          }
{/* Replies to comment start here */}
          <div className="comments-contant replies-content">
            {comment.replies && comment.replies.map((reply, indexR) => (
              <div key={reply.id}>
                <div className="comments">
                  <div className="comment-container">
                    <img className={`avatar ${editContentId === reply.id && 'currentUser-avatar'}`} 
                      src={reply.user.image.webp} alt="avatar">
                    </img>
                    <div className='margin-left'>
                      {reply.user.username === userName
                        ? 
                        (editContentId === reply.id
                          ? (<ReplyTo 
                              comment={reply}
                              isReplying={isReplying}
                              setIsReplying={setIsReplying}
                              editContentId={editContentId}
                              setEditContentId={setEditContentId}
                              updateReply={updateReply}
                            />)
                          :
                            (<>
                              <div className="replies-heading">
                                <div className="replies-heading-content">
                                  <span className="userName currentUserName">{userName}</span>
                                  <div className="replies-heading-content withoutName">
                                    <div className='reply-user-details'>
                                      <span className="you">you</span>
                                      <span className="created">{reply.createdAt}</span>
                                    </div>
                                    <div className='changeState-btns'>
                                      <button style={{marginRight: 20}} className="btn-delete" 
                                        onClick={() => handleDeleteConfirm(index, indexR)}
                                      >
                                        <span className="replyImg deleteImg"></span>
                                        <span>Delete</span>
                                      </button>
                                      <button className="btn-edit" onClick={() => handleEdit(reply.id)}>
                                        <span className="replyImg editImg"></span>
                                        <span>Edit</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {reply.replyingTo && reply.content.startsWith(`@${reply.replyingTo}`)
                                ? (<p className="text">
                                    <span className="replyingTo">@{reply.replyingTo}</span>
                                    {reply.content.substring(`@${reply.replyingTo},`.length)}
                                  </p>)
                                : <p className="text">{reply.content}</p>
                              }
      
                            </>)
                          )
                            
                        : (<>
                            <div className="replies-heading">
                              <div className="reply-userData user-details">
                                <span className="userName">{reply.user.username}</span>
                                <span className="created">{reply.createdAt}</span>
                              </div>
                              <button className="replyButton" onClick={() => handleReplyToReply(reply.id)}>
                                <span className="replyImg"></span>
                                <span>Reply</span>
                              </button>
                            </div> 
                            <p className="text">
                              <span className="replyingTo">@{reply.replyingTo}</span>
                              {reply.content}
                            </p>
                            <div className="likes">
                              <button
                                className={!likesState[index + indexR + 1].liked ? 'likeButton' : 'likeButton active'}
                                onClick={() => handleChangeLikeState(index + indexR + 1)}
                              >
                                <span className="likesDigit">{likesState[index + indexR + 1].likes}</span>
                              </button>
                            </div>
                          </>)
                      }
                    </div>
                  </div>
                </div>
                  {replyingToReply === reply.id && 
                    <ReplyTo
                      comment={reply}
                      commentId={comment.id}
                      commentIndex={index}
                      userName={userName}
                      commentUserName={reply.user.username}
                      replyId={reply.id}
                      userAvatar={userAvatar}
                      addReply={addReply}

                      isReplying={isReplying}
                      setIsReplying={setIsReplying}

                      isReplyingToReply={isReplyingToReply}
                      setIsReplyingToReply={setIsReplyingToReply}

                      setEditContentId={setEditContentId}
                    />
                  }
                  
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
