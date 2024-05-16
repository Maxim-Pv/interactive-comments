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
        // Сохранение данных в локальное хранилище (это синхронная операция)
        // все же пришлось добавить проверку на if (loading) {
        localStorage.setItem('jsonData', JSON.stringify(data));

        const storedData = localStorage.getItem('jsonData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setJsonData(parsedData);

          const initialScore = parsedData.comments.map(comment => ({
            likes: comment.score,
            liked: false,
          }));
          setLikesState(initialScore);

          const initialRepliesScore = parsedData.comments.map(comment => (
            comment.replies && comment.replies.length > 0
              ? comment.replies.map(reply => ({
                likes: reply.score,
                liked: false,
              }))
              : []
          )).flat();
          setLikesState(prevState => [...prevState, ...initialRepliesScore]);
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

  const handleChangeLikeState = (index) => {
    setLikesState((prevStates) => {
      const newState = { ...prevStates };
      if (!newState[index]) {
        newState[index] = {
          likes: 1,
          liked: true,
        };
      } else {
        newState[index] = {
          ...newState[index],
          likes: newState[index].liked ? newState[index].likes - 1 : newState[index].likes + 1,
          liked: !newState[index].liked,
        };
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

