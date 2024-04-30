import { useEffect, useState } from "react";
import data from './data.json';
// import Comments from "./components/Comments";
// import Replies from "./components/Replies/Replies";
// import CurrentUser from "./components/CurrentUser";
// import Modal from "./components/Modal";
// import axios from 'axios';
import './styles.css';
import CommentList from "./componentsNew/CommentList";
import UserComment from "./componentsNew/UserComment";
import Modal from "./componentsNew/Modal";

// function App() {
//   const [jsonData, setJsonData] = useState({});
//   const [likesState, setLikesState] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.PUBLIC_URL}/data.json`);
//         const data = response.data;
//         setJsonData(data)

//         if (data.comments && data.comments.length > 0) {
//           const initialScore = data.comments.map(comment => ({
//             likes: comment.score,
//             liked: false,
//           }))
//           setLikesState(initialScore)
          
//           const initialRepliesScore = data.comments.map(comment => (
//             comment.replies && comment.replies.length > 0
//               ? comment.replies.map(reply => ({
//                 likes: reply.score,
//                 liked: false,
//               }))
//               : []
//           )).flat();
//           setLikesState(prevState => [...prevState, ...initialRepliesScore]);
//         }
        
//       } catch (e) {
//         console.error('Error fetching data: ', e);
//       }
//     }
//     fetchData()
//   },[])

//   const handleChangeLikeState = (index) => {
//     if (!likesState[index].liked) {
//       setLikesState((prevStates) => {
//         const newState = [...prevStates];
//         newState[index] = {
//           ...newState[index],
//           likes: newState[index].likes + 1,
//           liked: true,
//         };
//         return newState;
//       });
//     } else {
//       setLikesState((prevStates) => {
//         const newState = [...prevStates];
//         newState[index] = {
//           ...newState[index],
//           likes: newState[index].likes - 1,
//           liked: false,
//         };
//         return newState;
//       });
//     }
//   };

//   useEffect(() => {
//     if (jsonData) {
//       localStorage.setItem("usersComments", JSON.stringify(jsonData));
//     }
//   }, [jsonData]);


//   const handleOpenModal = () => {
//     setIsModalOpen(!isModalOpen);
//   }


//   const handleDeleteConfirm = (id) => {
//     const deleteReply = (comments, id) => {
//       return comments.map(comment => {
//         if (comment.replies && comment.replies.length > 0) {
//           comment.replies = comment.replies.filter(reply => reply.id !== id);
//         }
//         return comment;
//       });
//     };
//     const storedData = JSON.parse(localStorage.getItem("usersComments"));
//     const updatedComments = storedData.comments.map(comment => {
//       if (comment.id === id) {
//         // Если комментарий, то удаляем его
//         return null;
//       } else {
//         // Если ответ, то удаляем его из комментария
//         return {
//           ...comment,
//           replies: deleteReply(comment.replies, id)
//         };
//       }
//     }).filter(Boolean);
//     localStorage.setItem('usersComments', JSON.stringify(updatedComments));
  
//     // Удаляем объект из likesState
//     setLikesState(prevState => prevState.filter(item => item.id !== id));
//   }

//   return (
//     <div className="container">
//       <Comments 
//         jsonData={jsonData}
//         likesState={likesState}
//         handleChangeLikeState={handleChangeLikeState}
//         handleOpenModal={handleOpenModal}
//         handleDeleteConfirm={handleDeleteConfirm}
//       />
//       <Replies 
//         jsonData={jsonData}
//         likesState={likesState}
//         handleChangeLikeState={handleChangeLikeState}
//         handleOpenModal={handleOpenModal}
//       />
//       <CurrentUser 
//         jsonData={jsonData}
//         likesState={likesState}
//         handleChangeLikeState={handleChangeLikeState}
//       />

//       <Modal 
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         handleDeleteConfirm={handleDeleteConfirm}
//       />
//     </div>
//   );
// }

// export default App;

function App() {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    localStorage.setItem('jsonData', JSON.stringify(data));
    setJsonData(data)
    setLoading(false)
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  const saveRepliesToStorage = (updatedReplies) => {
    localStorage.setItem('jsonData', JSON.stringify(updatedReplies));
  };

  const selectedReply = (id) => {
    setSelected(id)
  }

  const handleDelete = () => {
    const updatedReplies = { ...jsonData };

    if (selected.length === 2) {
      const selectedComment = selected[0]
      const selectedReply = selected[1]
      updatedReplies.comments[selectedComment].replies.splice(selectedReply, 1);
      saveRepliesToStorage(updatedReplies)
      setJsonData(updatedReplies);
      console.log(updatedReplies);
    } 
    setIsModalOpen(false)
    
  }

  return (
    <div className='container'>
      <CommentList 
        comments={jsonData.comments}
        userName={jsonData.currentUser.username}
        setIsModalOpen={setIsModalOpen}
        onDeleteReply={selectedReply}
      />
      <UserComment 
        avatar={jsonData.currentUser.image.webp}
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

