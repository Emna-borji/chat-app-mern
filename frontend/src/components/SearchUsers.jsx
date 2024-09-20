import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../redux/actions/usersActions'; 
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { MySingleSearch } from './MySingleSearch';
import { accessChat } from '../redux/actions/chatsActions';

const SearchUsers = () => {

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.usersReducer);

    

  const handleSearch = () => {
    if(!show)
      searchTerm = ''
    dispatch(searchUsers(searchTerm));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAccessChat = (userId) => {
    dispatch(accessChat(userId));  
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
  <button
    onClick={handleShow} // Your onClick function here
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'light grey',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      color: 'grey',
      width: '320px'
    }}
  >
    <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
    <span>Search User</span>
  </button>
</div>

    <Offcanvas show={show} onHide={handleClose} backdrop="static">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group controlId="searchInput">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSearch} disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
          {error && <div>{error}</div>}
          
            {users.map(user => (
              <MySingleSearch
                key={user._id}
                
                user={user}
                handleFunction={() => handleAccessChat(user._id)}
              />
            ))}
          
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default SearchUsers