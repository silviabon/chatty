import React, {Component} from 'react';

class Message extends Component {
  render() {
    let theStyle;
    switch(this.props.message.textColor){
      case 0:
      theStyle = {color: 'blue'};
        break;
      case 1:
      theStyle ={color: 'red'};
        break;
      case 2:
      theStyle = {color: 'green'};
        break;
      case 3:
      theStyle = {color: 'yellow'};
        break;
    };
    const theMessage = this.props.message.type === "incomingMessage" 
    ? (<div  className="message" >
        <span className="message-username" style={theStyle} >{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>) 
    : (<div className="message system">{this.props.message.content}</div>);
    
    return (
      theMessage
      );
  }
}
export default Message;
