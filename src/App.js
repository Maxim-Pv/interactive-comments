import { useEffect, useState } from "react";
import UserComment from "./components/UserComment";
import CommentList from "./components/CommentList";
import Modal from "./components/Modal";
import data from './data.json';
import './styles.css';

function App() {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null)
  const [likesState, setLikesState] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Saving data to local storage (this is a synchronous operation)
        // still had to add a check for if (loading) {
        localStorage.setItem('jsonData', JSON.stringify(data));

        const storedData = localStorage.getItem('jsonData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setJsonData(parsedData);
        
          const initialScore = parsedData.comments.map((comment, index) => ({
            key: `comment-${index}`,
            likes: comment.score,
            liked: false,
          }));

          const initialRepliesScore = parsedData.comments.flatMap((comment, index) =>
            comment.replies.map((reply, indexR) => ({
              key: `comment-${index}-reply-${indexR}`,
              likes: reply.score,
              liked: false,
            }))
          );
          setLikesState([...initialScore, ...initialRepliesScore]);
        }
        
      } catch (e) {
        console.error('Error fetching data: ', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='container'>Loading ...</div>;
  }

  const handleChangeLikeState = (key) => {
    setLikesState((prevStates) => {
      const newState = [...prevStates];
      const likeState = newState.find(state => state.key === key);
      if (!likeState) {
        newState.push({
          key,
          likes: 1,
          liked: true,
        });
      } else {
        likeState.likes = likeState.liked ? likeState.likes - 1 : likeState.likes + 1;
        likeState.liked = !likeState.liked;
      }
      return newState;
    });
  };

  const saveRepliesToStorage = (updatedReplies) => {
    localStorage.setItem('jsonData', JSON.stringify(updatedReplies));
  };

  const selectedReply = (id) => {
    setSelected(id)
  }

  const handleDelete = () => {
    const updatedReplies = { ...jsonData };

    if (selected.length === 2) {
      const selectedComment = selected[0];
      const selectedReply = selected[1];

      if (selectedReply === null ) {
        updatedReplies.comments.splice(selectedComment, 1);
        saveRepliesToStorage(updatedReplies)
        setJsonData(updatedReplies);
      } else {
        updatedReplies.comments[selectedComment].replies.splice(selectedReply, 1);
        saveRepliesToStorage(updatedReplies)
        setJsonData(updatedReplies);
      }
    } 

    setIsModalOpen(false)
  }

  const addReply = (commentIndex, commentId, replyId, newReply) => {
    setJsonData(prevData => {
      const updatedData = { ...prevData };
      const commentToUpdate = updatedData.comments.find(comment => comment.id === commentId);
      commentToUpdate.replies.push(newReply);
      localStorage.setItem('jsonData', JSON.stringify(updatedData));
      return updatedData;
    })
  };
  

  const updateReply = (replyId, newContent) => {
    setJsonData(prevData => {
      const updatedData = { ...prevData };
      for (let comment of updatedData.comments) {
        const replyToUpdate = comment.replies.find(reply => reply.id === replyId);
        if (replyToUpdate) {
          replyToUpdate.content = newContent;
          break;
        }
      }
      localStorage.setItem('jsonData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const addComment = (newComment) => {
    setJsonData(prevData => {
      const updatedData = { ...prevData };
      updatedData.comments.push(newComment);
      localStorage.setItem('jsonData', JSON.stringify(updatedData));
      return updatedData;
    });

    setLikesState(prevLikes => [
      ...prevLikes,
      {
        key: `comment-${prevLikes.length}`,
        likes: 0,
        liked: false
      }
    ]);
  };

  const updateComment = (commentId, newContent) => {
    setJsonData(prevData => {
      const updatedData = { ...prevData };
      for (let comment of updatedData.comments) {
        if (comment.id === commentId) {
          comment.content = newContent;
          break;
        }
      }
      localStorage.setItem('jsonData', JSON.stringify(updatedData));
      return updatedData;
    });
  };


  return (
    <div className='container'>
      <CommentList 
        comments={jsonData.comments}
        userName={jsonData.currentUser.username}
        likesState={likesState}
        handleChangeLikeState={handleChangeLikeState}
        setIsModalOpen={setIsModalOpen}
        onDeleteReply={selectedReply}
        userAvatar={jsonData.currentUser.image.webp}
        addReply={addReply}
        updateReply={updateReply}
        updateComment={updateComment}
      />
      <UserComment 
        avatar={jsonData.currentUser.image.webp}
        addComment={addComment}
        userName={jsonData.currentUser.username}
      /> 
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleConfirmDelete={handleDelete}
      />
    </div>
  )
  
}

export default App

