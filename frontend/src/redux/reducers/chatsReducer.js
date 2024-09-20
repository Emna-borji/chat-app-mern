  import {
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_ERROR,
    ACCESS_CHAT_REQUEST,
    ACCESS_CHAT_SUCCESS,
    ACCESS_CHAT_ERROR,
    CREATE_GROUP_CHAT_REQUEST,
    CREATE_GROUP_CHAT_SUCCESS,
    CREATE_GROUP_CHAT_ERROR,
    SET_SELECTED_CHAT,
    UPDATE_CHAT_NAME_REQUEST,
    UPDATE_CHAT_NAME_SUCCESS,
    UPDATE_CHAT_NAME_ERROR,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    REMOVE_USER_ERROR,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_REQUEST
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    loadingAccessChat: false,
    chats: [],
    error: null,
    errorAccessChat: null,
    loadingCreateGroupChat: false,
    errorCreateGroupChat : null,
    selectedChat: null,
    loadingUpdateChatName: false,
    errorUpdateChatName: null,
    loadingAddUser: false, 
    errorAddUser: null,
    loadingRemoveUser: false,
    errorRemoveUser: null

  };
  
  export default function chatsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_CHATS_REQUEST:
        return {
          ...state,
          loading: action.payload
        };
      case FETCH_CHATS_SUCCESS:
        return {
          ...state,
          loading: false,
          chats: action.payload
        };
      case FETCH_CHATS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case ACCESS_CHAT_REQUEST:
        return {
            ...state,
            loadingAccessChat: action.payload,
        };
      case ACCESS_CHAT_SUCCESS:
        if (!state.chats.find((c) => c._id === action.payload._id))
            return {
              ...state,
              loadingAccessChat: false,
              chats: [action.payload, ...state.chats] 
            };
        else 
            return {
                ...state,
                loadingAccessChat: false
            }
      case ACCESS_CHAT_ERROR:
      return {
        ...state,
        loadingAccessChat: false,
        errorAccessChat: action.payload
      };

      case CREATE_GROUP_CHAT_REQUEST:
  return {
    ...state,
    loadingCreateGroupChat: true,  
    errorCreateGroupChat: null,    
  };

case CREATE_GROUP_CHAT_SUCCESS:
  return {
    ...state,
    loadingCreateGroupChat: false,  
    chats: [action.payload, ...state.chats],  
    errorCreateGroupChat: null,     
  };

case CREATE_GROUP_CHAT_ERROR:
  return {
    ...state,
    loadingCreateGroupChat: false,  
    errorCreateGroupChat: action.payload,  
  };
  case SET_SELECTED_CHAT: // Handle setting the selected chat
            return {
                ...state,
                selectedChat: action.payload
            };
//UPDATE CHAT 
            case UPDATE_CHAT_NAME_REQUEST:
              return {
                ...state,
                loadingUpdateChatName: true,
                errorUpdateChatName: null, // reset error on new request
              };
            case UPDATE_CHAT_NAME_SUCCESS:
              return {
                ...state,
                loadingUpdateChatName: false,
                chats: state.chats.map((chat) =>
                  chat._id === action.payload._id ? action.payload : chat
                ),
              };
            case UPDATE_CHAT_NAME_ERROR:
              return {
                ...state,
                loadingUpdateChatName: false,
                errorUpdateChatName: action.payload,
              };

              //ADD USER 
      case ADD_USER_REQUEST:
      return {
        ...state,
        loadingAddUser: true,
        errorAddUser: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loadingAddUser: false,
        chats: state.chats.map((chat) =>
          chat._id === action.payload._id ? action.payload : chat
        ),
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loadingAddUser: false,
        errorAddUser: action.payload,
      };

//REMOVE USER FROM GROUP 

case REMOVE_USER_REQUEST:
  return {
    ...state,
    loadingRemoveUser: true,
    errorRemoveUser: null,
  };
case REMOVE_USER_SUCCESS:
  return {
    ...state,
    loadingRemoveUser: false,
    chats: state.chats.map((chat) =>
      chat._id === action.payload._id ? action.payload : chat
    ),
  };
case REMOVE_USER_ERROR:
  return {
    ...state,
    loadingRemoveUser: false,
    errorRemoveUser: action.payload,
  };

      default:
        return state;
    }
  }