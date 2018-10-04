import React from 'react';
import ReactDOM from 'react-dom';

class ChatBar extends React.Component {
  state = {
    currentUser:"",
    message:"",
  }

  componentDidMount() {
    this.setState({ currentUser: this.props.currentUser.name});
  }

  inputHandler = event => {
    const {
      currentUser,
      message,
    } = this.state;

    const {
      onMessageSubmit,
      onUsernameSubmit,
    } = this.props;

    if(event.key === 'Enter') {
        event.currentTarget.name === 'message'
        ? onMessageSubmit(message, "postMessage", currentUser)
        : onUsernameSubmit(message, "postNotification", currentUser);
    }
  };

  updateHandler = event => {
    const {
      name,
      value,
    } = event.currentTarget;

    this.setState({[name]: value})
  };

  render() {
    const {
      currentUser,
      message,
    } = this.state;

    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="currentUser"
          onChange={this.updateHandler}
          onKeyUp={this.inputHandler}
          value={currentUser}
        />
        <input
          className="chatbar-message"
          name="message"
          onChange={this.updateHandler}
          onKeyUp={this.inputHandler}
          placeholder="Type a message and hit ENTER"
          value={message}
        />
      </footer>
    );
  }
}

export default ChatBar;
