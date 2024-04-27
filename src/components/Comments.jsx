import React, { useState } from "react";
import CurrentUser from "./CurrentUser";

const Comments = ({ jsonData, likesState, handleChangeLikeState, handleOpenModal, handleDeleteConfirm }) => {
  const [clickedReplies, setClickedReplies] = useState({});

  const handleReply = (index) => {
    if (!clickedReplies[index]) {
      setClickedReplies((prevClickedReplies) => ({
        ...prevClickedReplies,
        [index]: true,
      }));
    }
  }

  
  return (
    <div className="comments-content">
      {jsonData && jsonData.comments
        ? jsonData.comments.map((comment, index) => (
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
                      <button className="replyButton" onClick={() => handleReply(index)}>
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
                  </div>
                </div>
              </div>
              {/* Здесь ответы для комментов */}
             {clickedReplies[index] && 
               (<CurrentUser 
                  jsonData={jsonData} 
                  userName={comment.user.username}
                  handleReply={() => handleReply(index)}
                  handleOpenModal={() => handleOpenModal(index)}
                  index={index}
                  handleDeleteConfirm={(id) => handleDeleteConfirm(id)}
                  // handleDelete={() => handleDelete(index)}
                />)
             }
            </div> 
          ))
        : "Loading comments..."}
    </div>
  );
};

export default Comments;
