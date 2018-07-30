import React from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../config';

const API_URL = config.API_URL;
class UpdateMeal extends React.Component{
  state = {
    name : '',
    category : '',
    amount : ''
  }

  handleChange = input => event => {
    this.setState({ [input] : event.target.value})
  }

  updateMeal = (fetchedMeal) => {
      const { name, category, amount} = fetchedMeal;
      this.setState({
          name : name,
          category : category,
          amount : amount
      })
      console.log(this.state);
  }

  submitMeal = () => {
    const { name, category, amount } = this.state;

    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;
    const meal_id = this.props.match.params.meal_id;
    const API_URL = config.API_URL;
    console.log(config);

    axios.put(`${API_URL}/${id}/meals/${meal_id}`,{
      token,
      name,
      category,
      amount
    })
    .then(function (response) {
      console.log(response);
      window.location.replace('/meals');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  fetchMeal = () => {
    const API_URL = config.API_URL;
    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;
    const meal_id = this.props.match.params.meal_id;
    

    axios.get(`${API_URL}/${id}/meals/${meal_id}`,{
      headers : {
        'x-access-token' : token
      }
    })
    .then( response => {
      const fetchedMeal = response.data;
      this.updateMeal(fetchedMeal);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    this.fetchMeal();
  }

  render(){
    return(
      <div>
        <div color='blue' className="container" >
            <Card style={{margin : '0 auto', width : '75%'}} >
            <header style= {{ padding : '2em' }}><h1>Update Meal</h1></header>
            <Form style= {{ padding : '2em' }}>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' value={this.state.name} onChange={this.handleChange('name')}/>
                <Form.Input fluid label='Category' value={this.state.category} onChange={this.handleChange('category')}/>
                <Form.Input fluid label='Amount' value={this.state.amount} onChange={this.handleChange('amount')}/>
            </Form.Group>
            <Button  color='blue' type='submit'onClick={this.submitMeal}>Submit</Button>
            </Form>
            </Card >
        </div>
      </div>
    )
  }
}

export default UpdateMeal;