import axios from 'axios';
import {
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR,
  SEARCH_GROUP_CHAT_USERS_REQUEST,
  SEARCH_GROUP_CHAT_USERS_SUCCESS,
  SEARCH_GROUP_CHAT_USERS_ERROR
} from './types';

const API_URL = '/api/users/';

// search users
export const searchUsers = (searchTerm) => {
  return async (dispatch) => {
    
    try {
      // Set loading state to true
      dispatch({ type: SEARCH_USERS_REQUEST, payload: true });

      // send GET request with search query
      const user = JSON.parse(localStorage.getItem("user"))
      const config = {
          headers : {
              "x-auth-token" : user ? user.token : null 
          }
      }

      const response = await axios.get(`${API_URL}?search=${searchTerm}`, config);

      console.log('Token:', localStorage.getItem('token'));
      // dispatch success action with the response data
      console.log(user.token)
      dispatch({
        type: SEARCH_USERS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: SEARCH_USERS_ERROR,
        payload: message
      });
    } finally {
      // Set loading state to false
      dispatch({ type: SEARCH_USERS_REQUEST, payload: false });
    }
  }
}


export const searchGroupChatUsers = (searchTerm) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEARCH_GROUP_CHAT_USERS_REQUEST });
      
      const user = JSON.parse(localStorage.getItem("user"));
      const config = { headers: { "x-auth-token": user.token }};
      
      const response = await axios.get(`${API_URL}?search=${searchTerm}`, config);
      
      dispatch({
        type: SEARCH_GROUP_CHAT_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_GROUP_CHAT_USERS_ERROR,
        payload: error.message,
      });
    }
  };
};


