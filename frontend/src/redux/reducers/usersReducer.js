import {
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_ERROR,
    SEARCH_GROUP_CHAT_USERS_ERROR,
    SEARCH_GROUP_CHAT_USERS_SUCCESS,
    SEARCH_GROUP_CHAT_USERS_REQUEST
  } from '../actions/types';
  
  const initialState = {
    groupChatUsers: [],
    loadingGroupChat: false,
    loading: false,
    users: [],
    error: null
  };
  
  export default function usersReducer(state = initialState, action) {
    switch (action.type) {
      case SEARCH_USERS_REQUEST:
        return {
          ...state,
          loading: action.payload
        };
      case SEARCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload
        };
      case SEARCH_USERS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        case SEARCH_GROUP_CHAT_USERS_REQUEST:
          return { ...state, loadingGroupChat: true };
        case SEARCH_GROUP_CHAT_USERS_SUCCESS:
          return { ...state, loadingGroupChat: false, groupChatUsers: action.payload };
        case SEARCH_GROUP_CHAT_USERS_ERROR:
          return { ...state, loadingGroupChat: false, error: action.payload };
      default:
        return state;
    }
  }