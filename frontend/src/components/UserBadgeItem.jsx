import React from 'react';
import { Badge, CloseButton } from 'react-bootstrap';

const UserBadgeItem = ({ user, admin, handleFunction }) => {
    return (
      <Badge
        pill
        style={{ padding: '0.5rem 0.75rem', borderRadius: '1rem', cursor: 'pointer' }}
        className="m-1 mb-2 bg-purple text-white"
        onClick={handleFunction}
      >
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
        <CloseButton onClick={handleFunction} className="pl-1" style={{ marginLeft: '8px' }} />
      </Badge>
    );
  };
  
  export default UserBadgeItem;