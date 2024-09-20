import axios from 'axios';
import {
    SELECT_USER_REQUEST,
    SELECT_USER_SUCCESS,
    SELECT_USER_ERROR,
    USER_ALREADY_ADDED,
    CREATE_GROUP_CHAT_REQUEST,
    CREATE_GROUP_CHAT_SUCCESS,
    CREATE_GROUP_CHAT_ERROR,

  } from '../actions/types';

const API_URL = '/api/chat/';

export const selectUsers = (userToAdd) => {
    return async (dispatch, getState) => {
      try {
        // Set loading state to true
        dispatch({ type: SELECT_USER_REQUEST });
        
        const { selectedMembers } = getState().groupReducer;
  
        // Check if user is already selected
        const existingUser = selectedMembers.find(user => user._id === userToAdd._id);
        if (existingUser) {
        dispatch({
            type: USER_ALREADY_ADDED,
            payload: userToAdd,
        });
        return;
        }

  
        // Dispatch success action with the response data
        dispatch({
          type: SELECT_USER_SUCCESS,
          payload: userToAdd,
        });
      } catch (error) {
        console.error(error);
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SELECT_USER_ERROR,
          payload: message,
        });
      }
    };
  };



