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
      // console.log(event.target.value);
      if(event.key === 'Enter') {
        this.props.onMessageSubmit(this.state.message);
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