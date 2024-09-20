import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { findOtherUser, useLoggedInUserId } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { accessChat, setSelectedChat } from '../redux/actions/chatsActions';

export default function MySingleChat({ chat }) {
  const loggedInUserId = useLoggedInUserId(); // Get the logged-in user ID using the hook
  const otherUser = findOtherUser(chat, loggedInUserId); 
 

  const dispatch = useDispatch()
  const handleChat = () => {
    console.log(otherUser._id)
      dispatch(accessChat(otherUser._id));
      dispatch(setSelectedChat(chat));
    };
  return (
    <li className="p-2 border-bottom">
                          <a
                            href="#!"
                            className="d-flex justify-content-between"
                            onClick={handleChat}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  src={`${
                                    chat.isGroupChat
                                      ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" // Return default image for group chats
                                      : otherUser.pic === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                      ? otherUser.pic // Return default image if user pic is the default one
                                      : `data:image/jpeg;base64,${otherUser.pic}` // Otherwise, return the base64-encoded image
                                  }`} 
                                  alt="avatar"
                                  className="d-flex align-self-center me-3"
                                  width="60"
                                  style={{
                                    borderRadius: '50%', // Makes the image round
                                  }}
                                />
                                <span className="badge bg-success badge-dot"></span>
                              </div>
                              <div className="pt-1">
                                <p className="fw-bold mb-0">{chat.isGroupChat? chat.chatName : otherUser?.name || "Unknown"}</p>
                                <p className="small text-muted">
                                  Hello, Are you there?
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1">Just now</p>
                              <span className="badge bg-danger rounded-pill float-end">
                                3
                              </span>
                            </div>
                          </a>
                        </li>
  )
}
