import axios from 'axios';
import {
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_ERROR,
  ACCESS_CHAT_REQUEST,
  ACCESS_CHAT_ERROR,
  ACCESS_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_ERROR,
  SET_SELECTED_CHAT,
  UPDATE_CHAT_NAME_SUCCESS,
  UPDATE_CHAT_NAME_ERROR,
  UPDATE_CHAT_NAME_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  REMOVE_USER_ERROR,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_REQUEST
} from './types';

const API_URL = '/api/chat/';

export const fetchChats = () => {
    return async (dispatch) => {
      try {
        // Set loading state to true
        dispatch({ type: FETCH_CHATS_REQUEST });
  
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "x-auth-token": user ? user.token : null,
          },
        };
  
        const response = await axios.get(API_URL, config);
  
        // Dispatch success action with the response data
        dispatch({
          type: FETCH_CHATS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: FETCH_CHATS_ERROR,
          payload: message,
        });
      }
    };
  };
  


  export const accessChat = (userId) => {
    return async (dispatch) => {
      try {
        // Set loading state to true
        dispatch({ type: ACCESS_CHAT_REQUEST, payload: true });
  
        // send GET request with search query
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        const config = {
            headers : {
                "x-auth-token" : user ? user.token : null 
            }
        }
  
        const response = await axios.post(API_URL, { userId }, config);
        
        console.log('Token:', localStorage.getItem('token'));
        console.log(user.token)
        // dispatch success action with the response data
        dispatch({
          type: ACCESS_CHAT_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        console.log(error);
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        dispatch({
          type: ACCESS_CHAT_ERROR,
          payload: message
        });
      } finally {
        // Set loading state to false
        dispatch({ type: ACCESS_CHAT_REQUEST, payload: false });
      }
    }
  }

  // Create group chat action creator
export const createGroupChat = (groupChatName) => {
  return async (dispatch, getState) => {  
    try {
      console.log(groupChatName)
      // Dispatch request action (set loading to true)
      dispatch({ type: CREATE_GROUP_CHAT_REQUEST });

      // Get selected members from the state (groupReducer)
      const { groupReducer: { selectedMembers } } = getState();  // Access members from chats state
      
      const user = JSON.parse(localStorage.getItem("user"));  // Retrieve the user from localStorage

      // Configuring headers for the request
      const config = {
        headers: {
          "x-auth-token": user ? user.token : null
        }
      };
      console.log(selectedMembers)
      // Make POST request to create a group chat
      const response = await axios.post(
        API_URL + "group", 
        {
          name: groupChatName,
          users: selectedMembers,  // Pass selected members from state
        }, 
        config
      );

      // Dispatch success action with response data (new group chat)
      dispatch({
        type: CREATE_GROUP_CHAT_SUCCESS,
        payload: response.data,  // The created group chat from the backend
      });

    } catch (error) {
      // Handle error
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
        
      dispatch({
        type: CREATE_GROUP_CHAT_ERROR,
        payload: message,
      });

    } 
  };
};


export const setSelectedChat = (chat) => {
  return {
      type: SET_SELECTED_CHAT,
      payload: chat,
  };
};


export const updateChatName = (chatId, newChatName) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_CHAT_NAME_REQUEST });

    const user = JSON.parse(localStorage.getItem("user"));

    const config = {
      headers: {
        "x-auth-token": user ? user.token : null
      }
    };
    
    const { data } = await axios.put(
      API_URL+'rename',
      { chatId, chatName: newChatName },
      config
    );

    dispatch({ type: UPDATE_CHAT_NAME_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: UPDATE_CHAT_NAME_ERROR,
      payload: error.response?.data?.message || 'Error occurred',
    });
  }
};

//add users

    
export const addUserToGroup = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_REQUEST, payload: true });

    const user = JSON.parse(localStorage.getItem("user"));

    const config = {
      headers: {
        "x-auth-token": user ? user.token : null
      }
    };
    
    const { data } = await axios.put(API_URL+'groupadd', { chatId, userId }, config);

    dispatch({ type: ADD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_USER_ERROR, payload: error.response.data.message });
  } 
};

//---------------------------------remove user from group-----------------------------------

export const removeUserFromGroup = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_USER_REQUEST, payload: true });

    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
      headers: {
        'x-auth-token': user ? user.token : null,
      },
    };

    const { data } = await axios.put(API_URL+'groupremove', { chatId, userId }, config);

    dispatch({ type: REMOVE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_USER_ERROR, payload: error.response.data.message });
  }
};


//-----------------MESSAGES-------------------------------


