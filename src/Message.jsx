import React from 'react';
import ReactDOM from 'react-dom';

const regex = (/\.(gif|jpg|jpeg|tiff|png)$/i);

const Message = ({
  color,
  message,
  type,
  username,
}) => type === 'incomingMessage'
? regex.test(message)
  ? (<li className="messages">
        <div className="message">
          <span className="message-username" style={{color:color}}>{username}</span>
          <span className="message-content">
            <img
              src={message}
              alt="image"
              style={{maxwidth: '60%'}}
            />
          </span>
        </div>
      </li>)
  : (<li className="messages">
        <div className="message">
          <span className="message-username" style={{color:color}}>{username}</span>
          <span className="message-content">{message}</span>
        </div>
      </li>)
: (<li className = "messages">
      <div className="message system">
        {message}
      </div>
    </li>);


export default Message;

 // if(this.props.type === "incomingNotification")