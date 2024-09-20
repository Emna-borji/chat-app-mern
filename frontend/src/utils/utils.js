import { useSelector } from 'react-redux';
import { accessChat } from '../redux/actions/chatsActions';

// Function to get the logged-in user ID
export const useLoggedInUserId = () => {
  const loggedInUserId = useSelector(state => state.authReducer.user?._id);
  return loggedInUserId;
};
export const useLoggedInUser = () => {
  const loggedInUser = useSelector(state => state.authReducer.user);
  return loggedInUser;
};

// Function to find the other user in the chat
export const findOtherUser = (chat, loggedInUserId) => {
  if (!chat || !loggedInUserId) return null;
  return chat.users.find(user => user._id !== loggedInUserId);
};


export const handleChat = (dispatch, userId) => {
        dispatch(accessChat(userId));
      };

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};




export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};