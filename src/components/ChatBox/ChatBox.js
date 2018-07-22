import React from 'react';
import './ChatBox.scss';
import Message from '../Message';
import { List } from 'semantic-ui-react';


        //represents the entire chatbox area, return a list of all messages recieved thus far

class ChatBox extends React.Component {     //props: messages, userID

    render() {
        return <div className='Message list'>
            <List celled={false} verticalAlign='middle'>
             {this.props.messages.map((message, key)=>{
                return <Message key={key} id={key} sessionID={this.props.userID} message={message} />
             })}
            </List>
        </div>
    }
}

export default ChatBox;