import React from 'react';
import './Message.scss';
import { List, Image } from 'semantic-ui-react';

    //this class represents a single message

class Message extends React.Component {     //props: key, id, sessionID, message (the json itself)
  render(){                                     //comparing the session IDs to determine message background
    return <List.Item style={{ background: (this.props.sessionID===this.props.message.sessionID) ? '#DAF1FF' : '' }}>  
             <Image avatar src={this.props.message.avatar} />
              <List.Content>
                <List.Header as='a'>{this.props.message.username}</List.Header>
                <List.Description>
                  {this.props.message.body}
                </List.Description>
              </List.Content>
            </List.Item>
  }
}

export default Message;