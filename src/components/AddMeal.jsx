import React from 'react';
import { Card, Form, Button, Radio } from 'semantic-ui-react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../config';
import Notifications, {notify} from 'react-notify-toast';

const API_URL = config.REACT_APP_API_URL;
class AddMeal extends React.Component{
  state = {
    name : '',
    category : '',
    amount : '',
    visible : false
  }

  handleChange = input => event => {
    this.setState({ [input] : event.target.value})
  }

  toggleVisible =  () => {
    this.setState({ visible : !this.state.visible })
  }

  submitMeal = () => {
    const { name, category, amount, visible } = this.state;

    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;

    axios.post(`${API_URL}/${id}/meals`,{
      token,
      name,
      category,
      amount,
      visible
    })
    .then(function (response) {
      console.log(response);
      window.location.replace('/meals');
    })
    .catch(function (error) {
      notify.show("Error adding meal", "error");
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        <div color='blue' className="container centered" >
            <Notifications />
            <Card style={{margin : '0 auto', width : '75%'}} >
            <header style= {{ padding : '2em' }}><h1>Add Meal</h1></header>
            <Form style= {{ padding : '2em' }}>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' placeholder='Name' onChange={this.handleChange('name')}/>
                <Form.Input fluid label='Category' placeholder='Category' onChange={this.handleChange('category')}/>
                <Form.Input fluid label='Amount' placeholder='Amount' onChange={this.handleChange('amount')}/>
                <Form.Field>
                  <Radio
                    toggle
                    name = 'visible'
                    label='Make this Meal Public'
                    value='this'
                    checked={this.state.visible}
                    onChange={this.toggleVisible}
                  />
                </Form.Field>
            </Form.Group>
            <Button  color='blue' type='submit'onClick={this.submitMeal}>Submit</Button>
            </Form>
            </Card >
        </div>
      </div>
    )
  }
}

export default AddMeal;