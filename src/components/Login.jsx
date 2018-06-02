import React from 'react';
import { Card } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

class LogIn extends React.Component{
    state = {
        username : '',
        password : ''
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value})
    }

    submitLogin = (state) => {
        const { username, password } = this.state;

        axios.post("http://localhost:8080/login", {
            username,
            password
          })
          .then(function (response) {
              const token = response.data.token;
              localStorage.setItem('token', token);
              window.location.replace('/meals');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
        <div color='blue' className="container" >
            <Card style={{margin : '0 auto', width : '50%'}} >
            <header style= {{ padding : '2em' }}><h1>Log In</h1></header>
            <Form style= {{ padding : '2em' }}>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Username' placeholder='Username' onChange={this.handleChange('username')}/>
                <Form.Input fluid label='Password' placeholder='Password' type='password' onChange={this.handleChange('password')} />
            </Form.Group>
            <Button  color='blue' type='submit'onClick={this.submitLogin}>Submit</Button>
            </Form>
            </Card >
        </div>
    )
  }
}

export default LogIn;