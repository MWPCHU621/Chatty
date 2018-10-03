import React from 'react';
import ReactDOM from 'react-dom';

class ChatBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser:"",
      message:""
    }

  }

  onKeyDown = event => {
    if(event.key === 'Enter') {
      this.props.onMessageSubmit(this.state.message);
    }
  }

  onKeyUp = event => {
    if(event.key === 'Enter') {
      this.props.onUsernameSubmit(this.state.currentUser);
    }
  }

  handleMessageUpdate = event => {
    this.setState({message: event.target.value})
  }

  handleUsernameUpdate = event => {
    this.setState({currentUser: event.target.value})
  }

  render() {
    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          value={this.state.currentUser}
          onKeyUp={this.onKeyUp}
          onChange={this.handleUsernameUpdate}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.onKeyDown}
          value={this.state.message}
          onChange={this.handleMessageUpdate}
        />
      </footer>
    );
  }
}

export default ChatBar;