import React, { Component, Fragment } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      messages: [],
      currentUser: {
        name: "Anonymous",
      },
      userCount: 0,
    }

    this.socket = new WebSocket("ws://localhost:3001/");
  }


  sendToServer = (content, type, username) => {
    const {
      currentUser,
    } = this.state;

    const {
      socket,
    } = this;

    if(type === "postMessage") {
      const message = {type, content, username: currentUser.name}

      socket.send(JSON.stringify(message));
    } else if(type === "postNotification") {
      const changeNameMessage = currentUser.name + " has changed their name to " + username;

      if(currentUser.name !== username) {
        this.setState({currentUser: {name:username}});
        const message = {type, content: changeNameMessage};
        socket.send(JSON.stringify(message));
      }
    }
  }

  componentDidMount() {

    const {
      socket,
    } = this;

    console.log("componentDidMount <App />");

    socket.onmessage = event => {
      const {
        messages,
      } = this.state;
      const incomingMsg = JSON.parse(event.data);

      switch(incomingMsg.type) {
        case "incomingMessage":
        console.log('prev messages', messages, incomingMsg)
          this.setState({
            messages:[
              ...messages,
              incomingMsg,
            ],
            key: incomingMsg.uuid
          });
          break;

        case "incomingNotification":
          this.setState({
            messages:[
              ...messages,
              incomingMsg,
            ],
            key: incomingMsg.uuid
          });
          break;

        case "userCountChanged":
          this.setState({
            userCount: incomingMsg.userCount,
          })
          break;

        default:
          console.warn('received undetermined message type', incomingMsg);
          break;
      };

      window.scrollTo(0, document.body.scrollHeight);
    };
  }

  render() {
    const {
      currentUser,
      messages,
      userCount,
    } = this.state;

    const {
      sendToServer,
    } = this;

    return (
      <Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <label className="navbar-userCount">{userCount} users online</label>
        </nav>

        {messages.length > 0 && <MessageList messages={messages}/>}

        <ChatBar
          currentUser={currentUser}
          onMessageSubmit={sendToServer}
          onUsernameSubmit={sendToServer}
        />
      </Fragment>
    );
  }
}

export default App;
