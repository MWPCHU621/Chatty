import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      messages: [],
      currentUser: {name: "james"}
    }

    this.socket = new WebSocket("ws://localhost:3001/");
  }

  updateUsername = username => {
    //let currentUser = {name:}
    this.setState({currentUser: {name: username}});
    console.log(this.state.currentUser);
  }

  sendToServer = content => {
    let socket = this.socket;
    const message = {content, username: this.state.currentUser.name}
    this.socket.send(JSON.stringify(message));
    socket.onmessage = event => {
      let incomingMsg = JSON.parse(event.data)
      this.setState({
        messages:[...this.state.messages, incomingMsg],
        key: incomingMsg.uuid
      });
    }
  }

  componentDidMount() {

    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

  }


  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          onMessageSubmit={this.sendToServer}
          onUsernameSubmit={this.updateUsername}
        />
      </div>
    );
  }
}
export default App;
