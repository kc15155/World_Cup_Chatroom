
//This is your top level React component, you may change everything

import React from 'react';
import logo from '../assets/spotim-logo.jpg';
import {Container, Image} from 'semantic-ui-react';
import defaultAvatar from '../assets/default.png';
import messiAvatar from '../assets/messi.png';
import neymarAvatar from '../assets/neymar.png';
import ronaldoAvatar from '../assets/ronaldo.png';
import worldCupAvatar from '../assets/worldcup.jpg';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import UserDetails from './UserDetails';
import InputText from './InputText';
import uuidv4 from 'uuid/v4';
import io from 'socket.io-client';


const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
      
`;


class App extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {
      username: 'Guest',
      userAvatar: defaultAvatar,
      messageLog: [{                                        //initiated with automated message
                   avatar: worldCupAvatar,
                   username: 'Admin',
                   body: 'Hello World (Cup)! Enjoy our chat room :)',
                   sessionID: uuidv4(),
      }],
      optionalAvatar: [
                         messiAvatar,
                         neymarAvatar,
                         ronaldoAvatar],
      userID: uuidv4(),
    };
  this.sendMessage = this.sendMessage.bind(this);
  this.initialize();
  }


  initialize() {        //connecting to the server
    this.socketChannel = io("https://spotim-demo-chat-server.herokuapp.com");

    this.socketChannel.on("connection", function () {});

    this.socketChannel.on("disconnect", function () {});

    this.socketChannel.on('spotim/chat', (current) => {
      this.setState({
        messageLog: [...this.state.messageLog, current]
      })
    });
  }


  sendMessage (text) {          //to be passed as prop to inputText for sending new message
    if (text === '')
      alert('Empty Message!');
    else {
      this.socketChannel.emit('spotim/chat',
        {
          avatar: this.state.userAvatar,
          username: this.state.username,
          body: text,
          sessionID: this.state.userID,                       //to tell between my own messages and others by comparing the ID
        }
      );
    }
   }

  updateInfo (user,avatar)        //setting new values for the user
  {
    this.setState({
      username: user,
      userAvatar: avatar,
    });
  }

  render() {
    return <div className={'site'}> 
      <Container className={'spotim-header'}>
        <div className={'spotim-title'}>
          <div>
          Welcome to the Spot.IM Chat app
          </div>
          <div>
            <Logo>
              <Image size={'tiny'} src={logo}/>
            </Logo>
          </div>
        </div>
      </Container>
      <div className={'user-details'}>
        <UserDetails username={this.state.username} avatar={this.state.userAvatar} avatarList={this.state.optionalAvatar} updateInfo={(user,avatar) => this.updateInfo(user,avatar)}/>
      </div>
      <div className={'chat-box'}>
        <ChatBox messages={this.state.messageLog} userID={this.state.userID} />
      </div>
      <div className={'input-box'}>
        <InputText sendFunc={this.sendMessage} username={this.state.username} avatar={this.state.userAvatar} />
      </div>
    </div>
  }
}

export default App;