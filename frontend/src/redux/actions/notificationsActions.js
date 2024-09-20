import { 
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION
  } from './types';


export const addNotification = (newMessageReceived) => (dispatch, getState) => {
  
      dispatch({
        type: ADD_NOTIFICATION,
        payload: newMessageReceived,
      });
  
    
  };

  export const removeNotification = (notificationToRemove) => (dispatch, getState) => {
    const { notifications } = getState().notificationsReducer;
  
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: notificationToRemove,
    });
  };