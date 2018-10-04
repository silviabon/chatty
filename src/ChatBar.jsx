import React, {Component} from 'react';

class ChatBar extends Component {
  
  render() {
    const onSubmit = e => {
      e.preventDefault();
         const message = e.target.elements.message.value;
         this.props.addNewMessage(message);
         e.target.elements.message.value = "";
    }
    const onBlur = e => {
      e.preventDefault();
      const user = e.target.value;
      this.props.changeUserName(user);
    }

    return (
      <form onSubmit={onSubmit}>
        <footer className="chatbar">
          <input className="chatbar-username" onBlur={onBlur} type="text" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} />
          <input className="chatbar-message" type="text" name="message" placeholder="Type a message and hit ENTER"/>
          <button type="submit" className="hidden">invisible button</button>
        </footer>
      </form>
    );
  }
}
export default ChatBar;
