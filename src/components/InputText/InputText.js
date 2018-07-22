import React from 'react';
import { Form, Input,Button } from 'semantic-ui-react'
import './InputText.scss';


//represents the text box for writing a new message


class InputText extends React.Component {  //props: sendFunc, username, avatar
  
  constructor(props)
  {
    super(props);
    this.state = {      //currently typed message in the box
      value: ''
    };
  }

  handleChange = (event) => this.setState({ value: event.target.value })  //for keeping message updated

  handleSubmit = (event) => {   //once message is submitted, will call the sendFunc
    event.preventDefault();
    this.props.sendFunc(this.state.value);
    this.setState({ value: ''});
  }

  render()
  {
   return <div className='chatBox'>
      <Form onSubmit={this.handleSubmit}>
         <Form.Field>
           <label><text>Your Message:</text></label>
           <Input value={this.state.value} placeholder='Please Type a Message ' {...this.props.username} onChange={this.handleChange}  />
           <Button type='submit' >Send</Button>
         </Form.Field>
       </Form>
    </div>
  }
}

export default InputText;