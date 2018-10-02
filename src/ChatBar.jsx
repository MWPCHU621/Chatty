import React from 'react';
import ReactDOM from 'react-dom';

class ChatBar extends React.Component {
  render() {
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;