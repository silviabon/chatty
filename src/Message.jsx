import React, { Component } from 'react';

class Message extends Component {
  render() {
    let theStyle;
    switch (this.props.message.textColor) {
      case 0:
        theStyle = { color: 'blue' };
        break;
      case 1:
        theStyle = { color: 'red' };
        break;
      case 2:
        theStyle = { color: 'green' };
        break;
      case 3:
        theStyle = { color: 'yellow' };
        break;
    };
    let image;
    let message = (this.props.message.content).split(" ");
    let message2 = message.map(str => {
      if (str.endsWith(".jpg") || str.endsWith(".png") || str.endsWith(".gif")) {
        image = str;
      }
      return str;
    });
    let message3 = message2.join(" ");


    const theMessage = this.props.message.type === "incomingMessage"
      ? image ?
        (<div><div className="message" >
          <span className="message-username" style={theStyle} >{this.props.message.username}</span>
          <span className="message-content">{message3}</span>
          </div>
          <div><img className="image-in-message" src={image} /></div>
        </div>)
        :
        (<div className="message" >
          <span className="message-username" style={theStyle} >{this.props.message.username}</span>
          <span className="message-content">{message3}</span>
        </div>)
      : (<div className="message system">{this.props.message.content}</div>);

    return (
      theMessage
    );
  }
}
export default Message;

