import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Navigate } from 'react-router-dom';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { accessChat, setSelectedChat } from '../redux/actions/chatsActions';
import { getSender } from '../utils/utils';
import { removeNotification } from '../redux/actions/notificationsActions';
import Profile from './Profile';

const Header = () => {
  const {user} = useSelector(state=>state.authReducer)
  const {notifications} = useSelector(state=>state.notificationsReducer)
  const dispatch = useDispatch()
  
  return (
    <>
    <>
    <header>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          

          <Navbar.Brand href="#" className="text-center">
            Talk-A-Tive
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user ? (
              <Nav className="ms-auto d-flex align-items-center">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-notifications">
                    <FaBell />
                    {notifications.length > 0 && (
                      <span className="badge bg-danger rounded-pill ms-1">
                        {notifications.length}
                      </span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {!notifications.length && (
                      <Dropdown.Item disabled>No New Messages</Dropdown.Item>
                    )}
                    {notifications.map((notif) => (
                      <Dropdown.Item
                        key={notif._id}
                        onClick={() => {
                          // Handle chat access
                          dispatch(setSelectedChat(notif.chat));
                          dispatch(removeNotification(notif));
                        }}
                      >
                        {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-profile">
                    <FaChevronDown />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Profile user={user}>
                      <Dropdown.Item href="#">My Profile</Dropdown.Item>
                    </Profile>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={()=>{dispatch(logout())}}>
                      <FaSignOutAlt /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <LinkContainer to="/login">
                  <Nav.Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaSignInAlt /> <span className="px-2">Sign In</span>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaUser /> <span className="px-2">Sign Up</span>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </>
    
    
    </>
  );
};

export default Header;