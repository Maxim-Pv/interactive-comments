import { useEffect, useState } from "react";
import Comments from "./components/Comments";
import Replies from "./components/Replies/Replies";
import CurrentUser from "./components/CurrentUser";
import './styles.css'
import Modal from "./components/Modal";


function App() {
  const [jsonData, setJsonData] = useState({});
  const [likesState, setLikesState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data.json`);
        const data = await response.json();
        setJsonData(data)

        if (data.comments && data.comments.length > 0) {
          const initialScore = data.comments.map(comment => ({
            likes: comment.score,
            liked: false,
          }))
          setLikesState(initialScore)
          
          const initialRepliesScore = data.comments.map(comment => (
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
      }
    }
    fetchData()
  },[])

   const handleChangeLikeState = (index) => {
    if (!likesState[index].liked) {
      setLikesState((prevStates) => {
        const newState = [...prevStates];
        newState[index] = {
          ...newState[index],
          likes: newState[index].likes + 1,
          liked: true,
        };
        return newState;
      });
    } else {
      setLikesState((prevStates) => {
        const newState = [...prevStates];
        newState[index] = {
          ...newState[index],
          likes: newState[index].likes - 1,
          liked: false,
        };
        return newState;
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  }




  return (
    <div className="container">
      <Comments 
        jsonData={jsonData}
        likesState={likesState}
        handleChangeLikeState={handleChangeLikeState}
        handleOpenModal={handleOpenModal}
      />
      <Replies 
        jsonData={jsonData}
        likesState={likesState}
        handleChangeLikeState={handleChangeLikeState}
        handleOpenModal={handleOpenModal}
      />
      <CurrentUser 
        jsonData={jsonData}
        likesState={likesState}
        handleChangeLikeState={handleChangeLikeState}
      />

      <Modal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
