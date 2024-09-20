import { 
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION
  } from '../actions/types';

const initialState = {
    notifications: [],
  };
  
  export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_NOTIFICATION:
        return {
          ...state,
          notifications: [action.payload, ...state.notifications], // Add new notification
        };

        case REMOVE_NOTIFICATION:
          return {
            ...state,
            notifications: state.notifications.filter(
              (n) => n !== action.payload // Remove the notification that matches the payload
            ),
          };
      
      default:
        return state;
    }
  };
  