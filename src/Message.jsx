import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
  render() {
    return(
      <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      </main>
    );
  }
}

export default Message;