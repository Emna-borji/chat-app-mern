import axios from 'axios';
import { 
  SEND_MESSAGE_REQUEST, 
  SEND_MESSAGE_SUCCESS, 
  SEND_MESSAGE_ERROR,
  FETCH_MESSAGES_REQUEST, 
  FETCH_MESSAGES_SUCCESS, 
  FETCH_MESSAGES_ERROR
} from './types';
import { socket } from '../../components/MyConvo';
const API_URL = '/api/message/';


export const sendMessage = (newMessage, selectedChat) => async (dispatch) => {
  socket.emit("stop typing", selectedChat._id);
  if (newMessage) {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST });

      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          'x-auth-token': user ? user.token : null,
        },
      };

      const { data } = await axios.post(
        API_URL,
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      console.log(selectedChat)
      socket.emit("new message", data);
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data,  // This is the new message data
      });

    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });

      
    }
  }
};


export const fetchMessages = (selectedChat) =>async (dispatch) => {
    if (!selectedChat) return;

    try {
        dispatch({ type: FETCH_MESSAGES_REQUEST });

        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          headers: {
            'x-auth-token': user ? user.token : null,
          },
        };



        const { data } = await axios.get(`${API_URL}${selectedChat._id}`, config);
      
      //setMessages(data);
      //setLoading(false);

      
      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data, 
      });

      
    } catch (error) {
        dispatch({
            type: FETCH_MESSAGES_ERROR,
            payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          });
    }
  };

