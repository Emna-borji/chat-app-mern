import React, { useState } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs'; // Eye icon

const Profile = ({ user, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {children ? (
        <span onClick={handleShow}>{children}</span>
      ) : (
        <Button variant="light" onClick={handleShow}>
          <BsEye size={20} />
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '30px', textAlign: 'center', width: '100%' }}>
            {user.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={`${
                `data:image/jpeg;base64,${user.pic}`
              }`} 
            alt={user.name}
            roundedCircle
            style={{ width: '150px', height: '150px' }}
          />
          <p style={{ fontSize: '20px', marginTop: '20px' }}>Email: {user.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;