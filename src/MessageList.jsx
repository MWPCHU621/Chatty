import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    return(
      <div>
      {this.props.messages.map((message, i) => (
        <Message key={i}username={message.username} message={message.content} />
      ))}
      </div>
    );
  }
}

// const MessageList = ({messages}) => (
//   <div>
//     {messages.map( (message, i) => <Message key={i} username={message.username} message={message.content}/>)}
//   </div>
// )
export default MessageList;