import React from "react";
import ReplyContent from "./ReplyContent";

const Replies = ({jsonData, likesState, handleChangeLikeState, handleOpenModal }) => {
  const currentUserName = jsonData?.currentUser?.username || '';

  return (
    <div className="comments-content replies-content">
      {jsonData && jsonData.comments
        && jsonData.comments.map((comment, index) => (
            <div className="comments-content" key={comment.id}>
              {comment.replies && comment.replies.length > 0 
                && <ReplyContent 
                    jsonData={jsonData}
                    comment={comment}
                    likesState={likesState}
                    handleChangeLikeState={handleChangeLikeState}
                    currentUserName={currentUserName}
                    index={index}
                    handleOpenModal={handleOpenModal}
                  />}
            </div>
          ))
      }
    </div>
  );
};

export default Replies;
