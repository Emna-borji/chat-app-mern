// reducers/chatsReducer.js

import {
    SELECT_USER_REQUEST,
    SELECT_USER_SUCCESS,
    SELECT_USER_ERROR,
    USER_ALREADY_ADDED
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    selectedMembers: [],
    selectError: null,
    userAlreadyAdded: null
  };
  
  export default function chatsReducer(state = initialState, action) {
    switch (action.type) {
      case SELECT_USER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case SELECT_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          selectedMembers: [...state.selectedMembers, action.payload]
        };
      case USER_ALREADY_ADDED:
        return {
          ...state,
          loading: false,
          userAlreadyAdded: action.payload
        };
      case SELECT_USER_ERROR:
        return {
          ...state,
          loading: false,
          selectError: action.payload
        };
      default:
        return state;
    }
  }
  