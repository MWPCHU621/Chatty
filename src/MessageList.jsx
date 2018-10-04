import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        return(
            <ul>
            {this.props.messages.map((message, i) => (
                <Message
                    key={i}
                    type={message.type}
                    username={message.username}
                    message={message.content}
                    color={message.color}
                />
            ))}
            </ul>
        );
    }
}
export default MessageList;