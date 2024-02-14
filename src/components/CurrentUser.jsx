import React, { useState } from 'react'
import HeadingContentCurrentUser from './Replies/HeadingContentCurrentUser'
import Modal from './Modal';


const CurrentUser = ({ jsonData, userName, likesState, handleChangeLikeState,
  handleReply, handleOpenModal }) => {
  const [currentUserReply, setCurrentUserReply] = useState(userName ? `@${userName}, `: '');
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(currentUserReply);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCurrentUserReply(newValue);
  };

  const handleSubmit = () => {
    const storedReplies = JSON.parse(localStorage.getItem("replies")) || [];

    const newReply = {
      userName: userName,
      content: currentUserReply,
    };

    if (newReply.content.trim() === '' || currentUserReply.trim() ===  `@${userName}, `.trim()) {
      handleReply()
    } else {
      const updatedReplies = [...storedReplies, newReply];
      // Сохраняем обновленные ответы в localStorage
      localStorage.setItem("replies", JSON.stringify(updatedReplies));
      setCurrentUserReply(currentUserReply.substring(`@${userName},`.length));
      setEditedContent(currentUserReply)
      setReply(!reply)
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log('handleEdit==');
  };

  const handleUpdate = () => {
    if (editedContent.trim() === '') {
      handleReply()
      // console.log('===handleUpdatehandleUpdate');
    } else {
      setCurrentUserReply(editedContent.substring(`@${userName},`.length));
      setIsEditing(!isEditing);
      // console.log('===ne handleUpdate');
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
                      created='now'
                      handleEdit={handleEdit}
                      handleOpenModal={handleOpenModal}
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

      <Modal

      />
    </div>
  )
}  

export default CurrentUser