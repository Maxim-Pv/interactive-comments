import React, { useState } from 'react'
import HeadingContentCurrentUser from './HeadingContentCurrentUser'
import CurrentUser from '../CurrentUser'
import Modal from '../../componentsNew/Modal';

const ReplyContent = ({ jsonData, comment, index, likesState, 
  handleChangeLikeState, currentUserName, handleOpenModal }) => {
  const [isClickedReply, setIsClickedReply] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [updateContent, setUpdateContent] = useState(false);

  const handleReply = (replyIndex) => {
    if (replyIndex === isClickedReply) {
      setIsClickedReply(null)
    } else {
      setIsClickedReply(replyIndex)
    }
  }

  const handleEdit = (replyContent) => {
    setEditedContent(replyContent)
  }

  const handleUpdate = () => {
    setEditedContent(editedContent);
    setUpdateContent(true)
  }



  return (
    <div>
      {comment.replies.map((reply, replyIndex) => (
      <div key={reply.id}>
        <div className="comments">
          <div className="comment-container">
            <img className="avatar" src={reply.user.image.webp} alt="avatar"></img>
            <div>
              <div className="replies-heading">
                {reply.user.username === currentUserName 
                  ? (<>
                      <HeadingContentCurrentUser
                        userName={reply.user.username}
                        created={reply.createdAt}
                        handleEdit={() => handleEdit(reply.content)}
                        handleOpenModal={() => handleOpenModal(replyIndex)}
                      />
                    </>
                    )
                  : (<>
                      <div className="reply-userData">
                        <span className="userName">{reply.user.username}</span>
                        <span className="created">{comment.createdAt}</span>
                      </div>
                      <button className="replyButton" onClick={() => handleReply(replyIndex)}>
                        <span className="replyImg"></span>
                        <span>Reply</span>
                      </button>
                    </>)
                }
              </div>
              
                
                {reply.user.username === currentUserName && editedContent !== '' 
                  ? 
                    (<>
                      <div className={`edit-update ${updateContent ? 'hidden' : ''}`}>
                        <textarea
                          className="currentUser-text editedText" 
                          defaultValue={`@${reply.replyingTo}${editedContent}`}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <button className="btn-send update" onClick={handleUpdate}>
                          UPDATE
                        </button>
                      </div>
                      <div>
                        <p className={`text ${updateContent ? '' : 'hidden'}`}>
                          <span className="replyingTo">@{reply.replyingTo}</span>
                          {editedContent}
                        </p>
                      </div>
                    </>
                    )
                  : 
                    (<p className="text">
                      <span className="replyingTo">@{reply.replyingTo}</span>
                      {reply.content}
                    </p>)
                }
                
              <div className="likes">
                <button
                  className={!likesState[index + replyIndex + 1].liked ? 'likeButton' : 'likeButton active'}
                  onClick={() => handleChangeLikeState(index + replyIndex + 1)}
                >
                  <span className="likesDigit">{likesState[index + replyIndex + 1].likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        { isClickedReply === replyIndex
        && <CurrentUser 
              jsonData={jsonData} 
              userName={reply.user.username}
              handleReply={() => handleReply(replyIndex)}
              handleEdit={() => handleEdit(reply.content)}
              handleOpenModal={() => handleOpenModal(replyIndex)}
            /> 
        }
      
      </div>
      
      
    ))}

    </div>
  )
}

export default ReplyContent

