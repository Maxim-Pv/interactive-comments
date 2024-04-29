import React, { useEffect, useState } from 'react'
import HeadingContentCurrentUser from './Replies/HeadingContentCurrentUser'
import Modal from '../componentsNew/Modal';


const CurrentUser = ({ jsonData, userName, likesState, handleChangeLikeState,
  handleReply, handleOpenModal, index }) => {
  const [currentUserReply, setCurrentUserReply] = useState(userName ? `@${userName}, `: '');
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(currentUserReply);

  const handleChange = (event) => {
    setCurrentUserReply(event.target.value);
  };

  const handleSubmit = () => {
    if (currentUserReply.trim() ===  `@${userName}, `.trim()) {
      handleReply()
      console.log('handle work reply');

    } else {
      const storedData = JSON.parse(localStorage.getItem("usersComments"));
      const commentToUpdate = storedData.comments.find(comment => comment.id === (index + 1));
      const newReply = {
        id: commentToUpdate.replies.length + 2,
        content: currentUserReply,
        createdAt: "now",
        score: 0,
        replyingTo: userName,
        user: jsonData.currentUser
      };
      commentToUpdate.replies.push(newReply);
      localStorage.setItem('usersComments', JSON.stringify(storedData));
      // console.log(storedData);

      setCurrentUserReply(currentUserReply.substring(`@${userName},`.length));
      setEditedContent(currentUserReply)
      setReply(!reply)
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
    }
  };

  const handleUpdate = () => {
    if (editedContent.trim() === '') {
      handleReply()
    } else {   
      const storedData = JSON.parse(localStorage.getItem("usersComments"));
      const commentToUpdate = storedData.comments.find(comment => comment.id === (index + 1));

      const updatedReplies = commentToUpdate.replies.map(reply => {
        if (reply.id === index) {
          return {
            ...reply,
            content: editedContent,
          };
        }
        return reply;
      });

      console.log(updatedReplies);

      const updatedComment = {
        ...commentToUpdate,
        replies: updatedReplies,
      };

      console.log(updatedComment);

      const updatedComments = storedData.comments.map(comment => {
        if (comment.id === (index + 1)) {
          return updatedComment;
        }
        return comment;
      });

      const updatedData = {
        ...storedData,
        comments: updatedComments,
      };

      localStorage.setItem('usersComments', JSON.stringify(updatedData));
    

      setCurrentUserReply(editedContent.substring(`@${userName},`.length));
      setIsEditing(!isEditing);
    }

  }


  return (
    <div>
      {jsonData && jsonData.currentUser && 
        (<div>
          {!reply 
            ? 
              (<div className="comments currentUser-content">
                <img  className="avatar" src={jsonData.currentUser.image.webp} alt="avatar"></img>
                <textarea
                  className="currentUser-text editedText"
                  value={currentUserReply}
                  onChange={handleChange}
                />
            
                <button className="btn-send" onClick={handleSubmit}>
                  {userName ? 'REPLY' : 'SEND'}
                </button>
              </div>)
            : 
              (<div className="comments comment-container replies-content">
                <img className="avatar" src={jsonData.currentUser.image.webp} alt="avatar"></img>
                <div>
                  <div className='replies-heading'>
                    <HeadingContentCurrentUser 
                      userName={jsonData.currentUser.username}
                      handleEdit={handleEdit}
                      handleOpenModal={handleOpenModal}
                      index={index}
                    />
                  </div>
                {!isEditing
                  ? 
                    (editedContent.startsWith(`@${userName}`)
                      ? 
                        (<p className="text">
                          <span className="replyingTo">@{userName}</span>
                          {currentUserReply}
                        </p>)
                      : 
                        (<p className="text">
                          {editedContent}
                        </p>))
                  : 
                    (<div className='edit-update'>
                      <textarea
                        className="currentUser-text editedText"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button className="btn-send update" onClick={handleUpdate}>
                        UPDATE
                      </button>
                    </div>)
                }  
                </div>
              </div>)
          }
        </div>)
      }
    </div>
  )
}  

export default CurrentUser