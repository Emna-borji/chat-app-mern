import React from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, useLoggedInUserId } from '../utils/utils'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const ScrollableChat = ({messages}) => {
  const user = useLoggedInUserId();
  console.log(messages)
  return (
    <>
     {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user) || isLastMessage(messages, i, user)) && (
              <OverlayTrigger
                placement="bottom-start"
                overlay={<Tooltip id={`tooltip-${m._id}`}>{m.sender.name}</Tooltip>}
              >
                <img
                  src={`data:image/jpeg;base64,${m.sender.pic}`}
                  roundedCircle
                  style={{ marginTop: "7px", marginRight: "5px", cursor: "pointer", width: '30px', height: '30px', borderRadius: '50%' }}
                  alt={m.sender.name}
                />
              </OverlayTrigger>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user),
                marginTop: isSameUser(messages, m, i, user) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  )
}

export default ScrollableChat