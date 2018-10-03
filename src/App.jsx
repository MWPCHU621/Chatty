import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentUser: {name: "james"}
    }

    this.socket = new WebSocket("ws://localhost:3001/");

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

  }

  handleMessageSubmit = content => {
    const message = {content, username: this.state.currentUser.name}
    this.setState({ messages:[...this.state.messages, message]});
  }

  sendToServer = content => {
    const message = {content, username: this.state.currentUser.name}
      //debugger
    this.socket.send(JSON.stringify(message));
  }


  componentDidMount() {
    let socket = this.socket;

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    if(socket) {
      console.log("Connected to Server");
    }

  }


  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onMessageSubmit={this.sendToServer}/>
      </div>
    );
  }
}
export default App;
