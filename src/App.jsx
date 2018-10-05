import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.socket;
    // this is the *only* time you should assign directly to state:
    this.state = {
      loading: true,
      userCount: 0,
      currentUser: {name: "Anonymous", textColor: Math.floor(Math.random() * Math.floor(4))}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
        // {
        //   id: 1,
        //   type: "incomingMessage",
        //   content: "I won't be impressed with technology until I can download food.",
        //   username: "Anonymous1",
        //   textColor: 0
        // },
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }
  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event)=> {
      const message = JSON.parse(event.data);
      switch(message.type){
        case "incomingMessage" :
        case "incomingNotification":
          const newMessagesArray = this.state.messages.concat(message);
          this.setState({messages: newMessagesArray});
          break;
        case "userCountUpdate":
          this.setState({userCount: message.count});
          break;
        case "newConection":
        this.setState({currentUser: message.user});
        break;
      }
    }
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 500)
  }

  addNewMessage(message){
    const user = this.state.currentUser.name;
    const textColor = this.state.currentUser.textColor;
    const newMessage = {type: "postMessage", content: message, username: user, textColor: textColor};
    this.socket.send(JSON.stringify(newMessage));    
  }

  changeUserName(username){
    if(this.state.currentUser.name != username){
      const newUser = {name: username, textColor: this.state.currentUser.textColor};
      const promise = new Promise(()=>{
        const newMessage = {type: "postNotification", content: `${this.state.currentUser.name} changed their name to ${username}`, username: username};
        this.socket.send(JSON.stringify(newMessage)); 
      }).then(this.setState({currentUser: newUser}));
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="userCount">{this.state.userCount} users online</div>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser} addNewMessage={this.addNewMessage} changeUserName={this.changeUserName}/>
        </div>
      );
    }
  }
}
export default App;
