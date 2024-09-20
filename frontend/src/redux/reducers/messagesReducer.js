import { 
    SEND_MESSAGE_REQUEST, 
    SEND_MESSAGE_SUCCESS, 
    SEND_MESSAGE_ERROR, 
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_ERROR,
    NEW_MESSAGE_RECEIVED
  } from '../actions/types';
  
  const initialState = {
    loadingMessage: false,
    newMessage: "",
    messages: [],
    errorLoadingMessage: null,
    loadingFetchMessages: false,
    errorFetchMessages: null,
  };



  export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_MESSAGE_REQUEST:
        return {
          ...state,
          loadingMessage: true,
        };
  
      case SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          loadingMessage: false,
          messages: [...state.messages, action.payload],  // Add the new message
        };
  
      case SEND_MESSAGE_ERROR:
        return {
          ...state,
          loadingMessage: false,
          errorLoadingMessage: action.payload,  // Capture the error message
        };
        case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        loadingMessages: true,
        errorMessages: null,
      };
      
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loadingMessages: false,
        messages: action.payload,
      };

    case FETCH_MESSAGES_ERROR:
      return {
        ...state,
        loadingMessages: false,
        errorMessages: action.payload,
      };
      case NEW_MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload], // Append the new message
      };
  
      default:
        return state;
    }
  };