import React from 'react'
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { searchGroupChatUsers } from '../redux/actions/usersActions';
import { MySingleSearch } from './MySingleSearch';
import { selectUsers } from '../redux/actions/groupActions';
import { createGroupChat } from '../redux/actions/chatsActions';

const GroupChatModal = () => {
    const [show, setShow] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [groupChatName, setGroupChatName] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const { groupChatUsers, loadingGroupChat, error } = useSelector(state => state.usersReducer);
  const { loading, selectedMembers, selectError, userAlreadyAdded } = useSelector(state => state.groupReducer);
  const { loadingCreateGroupChat, errorCreateGroupChat } = useSelector(state => state.chatsReducer);

    const handleSearch = (query)=> {
        setSearchTerm(query);
        if (query.trim()) {
            dispatch(searchGroupChatUsers(query));
        }
    }

    const handleSelectMember = (userToAdd)=> {
        dispatch(selectUsers(userToAdd))
    }

    const handleCreateGroupChat = () => {
      if (groupChatName && selectedMembers.length > 0) {
        dispatch(createGroupChat(groupChatName)); // Call createGroupChat action
        handleClose(); // Close the modal after creating the group
      } else {
        alert('Please provide a group name and add members to the group.');
      }
    };
  return (
    <>
      <Button
        onClick={handleShow}
        style={{
          backgroundColor: 'lightblue',
          border: 'none',
          color: 'blue',
          display: 'flex',
          alignItems: 'center',
          padding: '10px 15px',
        }}
      >
        
        <i className="fas fa-plus" style={{ marginLeft: '8px', color: 'blue' }}></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
        <InputGroup.Text>Chat name</InputGroup.Text>
        <Form.Control
          aria-label="Chat name"
          value={groupChatName} // Controlled input value
          onChange={(e) => setGroupChatName(e.target.value)} // Update groupChatName state
        />
      </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Text>Add user</InputGroup.Text>
      <Form.Control aria-label="Add user" onChange={(e) => handleSearch(e.target.value)} />
      
    </InputGroup>
    {loadingGroupChat && <p>Loading users...</p>}
          {error && <p className="text-danger">{error}</p>}
          {/* Display selected members side by side */}
          {selectedMembers.length > 0 && (
                        <>
                            <h5>Selected Members:</h5>
                            <div className="selected-members-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {selectedMembers.map(member => (
                                    <div key={member._id} className="selected-member" style={{ textAlign: 'center' }}>
                                        <img 
                                            src={`data:image/jpeg;base64,${member.pic}`} 
                                            alt="avatar"
                                            className="d-flex align-self-center me-3"
                                            width="40"
                                            style={{ borderRadius: '50%' }}
                                        />
                                        <p style={{ fontSize: '0.9em' }}>{member.name}</p>
                                        <p>-</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

    {groupChatUsers.map(user => (
              <MySingleSearch
                key={user._id}
                
                user={user}
                handleFunction={()=>handleSelectMember(user)}
              />
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateGroupChat}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GroupChatModal