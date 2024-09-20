import React, { useEffect } from 'react'
import MySingleChat from './MySingleChat'
import { fetchChats } from '../redux/actions/chatsActions'; 
import { useDispatch, useSelector } from 'react-redux';


const AllChats = ({fetchAgain}) => {
  const { chats, loading, error } = useSelector(state => state.chatsReducer);
  const dispatch = useDispatch();

  /*useEffect(() => {
    
    dispatch(fetchChats())
  }, [dispatch]);*/
  
  useEffect(() => {
    
    dispatch(fetchChats())
  }, [fetchAgain]);
  return (
    <div style={{
      overflow: 'hidden',  // Hide scrollbars
      maxHeight: '100vh',  // Ensure container does not exceed viewport height
      padding: '10px'      // Optional: Add padding as needed
    }}>
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : chats.length === 0 ? (
      <p>No chats available.</p>
    ) : (
      chats.map(chat => (
        <MySingleChat
          key={chat._id}
          chat={chat}
          
        />
      ))
    )}
  </div>
  )
}

export default AllChats