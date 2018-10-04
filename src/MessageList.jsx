import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(){
    super();
    this.state = {
      
    };
  }
  render() {
    const messageListItems = this.props.messages.map(message => (
      <Message message={message} key = {message.id} />
    ));
    return (
      <main className="messages"> 
        {messageListItems}
      </main>
    );
  }
}
export default MessageList;
