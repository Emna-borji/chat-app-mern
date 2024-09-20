import React, { useState } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ProfileModal = ({ user, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {children ? (
        <span onClick={handleShow}>{children}</span>
      ) : (
        <Button variant="outline-primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Image
            roundedCircle
            src={`data:image/jpeg;base64,${user.pic}`}
            alt={user.name}
            style={{ width: '150px', height: '150px' }}
          />
          <h5 className="mt-3">Email: {user.email}</h5>
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

export default ProfileModal;
