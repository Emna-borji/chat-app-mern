import React from 'react'

const MainNavbar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-search">Search Users to chat</Tooltip>}
        >
          <Button variant="outline-primary">
            <i className="fas fa-search"></i>
            <span className="d-none d-md-inline-block ms-2">Search User</span>
          </Button>
        </OverlayTrigger>

        <Navbar.Brand href="#" className="text-center">
          Talk-A-Tive
        </Navbar.Brand>

        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-notifications">
              <Bell />
              {notification.length > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">
                  {notification.length}
                </span>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!notification.length && (
                <Dropdown.Item disabled>No New Messages</Dropdown.Item>
              )}
              {notification.map((notif) => (
                <Dropdown.Item
                  key={notif._id}
                  onClick={() => {
                    accessChat(notif.chat._id);
                    // Remove notification after clicked
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${notif.chat.users[0].name}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-profile">
              <Avatar name={user.name} size="30" round src={user.pic} />
              <ChevronDown />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">My Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </>
  )
}

export default MainNavbar