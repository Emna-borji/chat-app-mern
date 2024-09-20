import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateChatName,
    addUserToGroup,
    removeUserFromGroup
  } from '../redux/actions/chatsActions';
import UserBadgeItem from './UserBadgeItem';
import { searchGroupChatUsers } from '../redux/actions/usersActions';
import { MySingleSearch } from './MySingleSearch';
import { useLoggedInUserId } from '../utils/utils';

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupChatName, setGroupChatName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const selectedChat = useSelector((state) => state.chatsReducer.selectedChat);
  const loadingUpdateChatName = useSelector((state) => state.chatsReducer.loadingUpdateChatName);
  const loading = useSelector((state) => state.usersReducer.loading);
  const { groupChatUsers, loadingGroupChat, error } = useSelector(state => state.usersReducer);
  const loggedInUserId = useLoggedInUserId();


    const dispatch = useDispatch()

    const handleSearch = (query)=> {
        setSearchTerm(query);
        if (query.trim()) {
            dispatch(searchGroupChatUsers(query));
        }
    }

  const handleRename = () => {
    if (groupChatName !== selectedChat.chatName) {
      dispatch(updateChatName(selectedChat._id, groupChatName));
    }
    setFetchAgain(!fetchAgain);
  };

  const handleAddUser = (user) => {
    dispatch(addUserToGroup(selectedChat._id, user._id));
    setFetchAgain(!fetchAgain);
  };

  const handleRemove = (user) => {
    dispatch(removeUserFromGroup(selectedChat._id, user._id));
    setFetchAgain(!fetchAgain);
    fetchMessages()
  };
  

  return (
    <>
         {/* Trigger Button */}
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faEye} />
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title className="w-100 text-center" style={{ fontSize: "35px", fontFamily: "Work Sans" }}>
            {selectedChat.chatName}
          </Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          {/* Users in Group */}
          <div className="d-flex flex-wrap pb-3">
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>

          {/* Update Group Name */}
          <Form className="d-flex mb-3">
            <Form.Control
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="success"
              className="ml-2"
              onClick={handleRename}
              disabled={loadingUpdateChatName}
            >
              {loadingUpdateChatName ? <Spinner as="span" animation="border" size="sm" /> : "Update"}
            </Button>
          </Form>

          {/* Add User to Group */}
          <Form>
            <Form.Control
              placeholder="Add User to group"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form>

          {/* Search Results */}
          {loading ? (
            <div className="d-flex justify-content-center py-3">
              <Spinner animation="border" />
            </div>
          ) : (
            groupChatUsers?.map((user) => (
              <MySingleSearch
                key={user._id}
                
                user={user}
                handleFunction={()=>handleAddUser(user)}
              />
            ))
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleRemove(loggedInUserId)}>
            Leave Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal