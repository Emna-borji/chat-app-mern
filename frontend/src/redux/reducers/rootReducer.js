import { combineReducers } from "redux";
import authReducer from './authReducer'
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import groupReducer from "./groupReducer";
import { messagesReducer } from "./messagesReducer";
import { notificationsReducer } from "./notificationsReducer";


const rootReducer = combineReducers({authReducer, usersReducer, chatsReducer, groupReducer, messagesReducer, notificationsReducer})


export default rootReducer