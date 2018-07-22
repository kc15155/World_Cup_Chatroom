import React from 'react';
import {Image,Input,Form,Button,Header} from 'semantic-ui-react'
import './UserDetails.scss';
import defaultAvatar from '../../assets/default.png'


//represents the left-sided area of the chat, includes:
// 1. current information about the user (username, avatar)
// 2. an optional area for the user to change his username or avatar


class UserDetails extends React.Component{   //props: username, avatar, avatarList, updateInfo
  constructor(props)
  {
    super(props);
    this.state={
      userValue: '',    //currently typed username
      avatar: this.props.avatar,  //currently chosen avatar
    };
  }

  handleChangeUser = (event) => {
    this.setState({userValue: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateInfo(this.state.userValue,this.state.avatar);
    this.setState({ avatar:defaultAvatar, userValue:''})
  }

  render()
  {
    return <div className='details'>
        <div className={'current-details'}>
          <div> ----------------------------------------</div>
          <div>
            <Header textAlign='center' size='small'>Your current details are:</Header>
          </div>
          <div>
             <Header textAlign='center' size='small'>Username: {this.props.username}</Header>
          </div>
            <Image size='small' centered={true} src={this.props.avatar}/>
        </div>     
        <div className={'change-details'}>
          <Header size='small' textAlign='center'>Hello, {this.props.username}!</Header>
          <Header size='small' textAlign='center'>To change details, please choose a username and avatar below:</Header>
          <Input value={this.state.userValue} onChange={this.handleChangeUser} />
          <Header textAlign='center' className='avatar-choices'>
                  {this.props.avatarList.map((address, key) => {
                  return <Image key={key} href='#' centered={true}
                  verticalAlign='bottom' avatar src={address}
                  onClick={() => this.setState({ avatar: address })} />
              })}   
          </Header>
          <Form onSubmit={this.handleSubmit} >
            <Button type='submit' >Apply</Button>
          </Form>
        </div>
    </div>
  }
}

export default UserDetails;