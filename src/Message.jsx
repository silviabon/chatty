import React, {Component} from 'react';

class Message extends Component {
  render() {
    const theMessage = this.props.message.type === "incomingMessage" 
    ? (<div  className="message" >
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>) 
    : (<div className="message system">{this.props.message.content}</div>);
    // : (<div className="notification">
    //     <span className="notification-content">{this.props.message.content}</span>
    //   </div>);
    return (
      theMessage
      );
  }
}
export default Message;
