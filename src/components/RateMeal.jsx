import React from 'react';
import { Card, List, Rating, Button } from 'semantic-ui-react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../config';
import Notifications, {notify} from 'react-notify-toast';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

const API_URL = config.REACT_APP_API_URL;

class RateMeal extends React.Component{
  state = {
    name : '',
    category : '',
    amount : '',
    openModal : false
  }

  handleChange = input => event => {
    this.setState({ [input] : event.target.value})
  }

  toggleVisible =  () => {
    this.setState({ visible : !this.state.visible })
  }

  updateMeal = (fetchedMeal) => {
      const { name, category, amount, visible } = fetchedMeal;
      this.setState({
          name : name,
          category : category,
          amount : amount,
      })
  }

  handleRate = (e, { rating }) => this.setState({ rating })

  submit = () => {
    confirmAlert({
      title: 'Confirm to rate',
      message: 'Click Yes to submit rating',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.submitRating()
        },
        {
          label: 'No',
          onClick: () => alert("Changes not saved")
        }
      ]
    })
  };

  submitRating = () => {
    const { rating } = this.state;

    const token = localStorage.getItem('token');
    const meal_id = this.props.match.params.meal_id;

    axios.post(`${API_URL}/rate/${meal_id}`,{
      token,
      rating
    })
    .then(function (response) {
      console.log(response);
      window.location.replace('/discover');
    })
    .catch(function (error) {
      notify.show("Error rating meal: Remember you can only rate once", "error");
      console.log(error);
    });
  }
  
  fetchMeal = () => {
    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;
    const meal_id = this.props.match.params.meal_id;
    

    axios.get(`${API_URL}/meal/${meal_id}`,{
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
    const { name, category, amount } = this.state;
    return(
      <div>
        <div color='blue' className="container centered" >
            <Notifications />
            <Card style={{margin : '0 auto', width : '75%'}} color='blue' >
            <header style= {{ padding : '2em' }}><h1>Rate Meal</h1></header>
            <List relaxed divided style={{padding: '20px'}}>
                <List.Item icon='food' content={"Name : " + name} />
                <List.Item icon='database' content={"Category : " + category} />
                <List.Item icon='linkify' content={"Amount : " + amount} />
                <List.Item >
                    <Rating icon='star' maxRating={5} onRate={this.handleRate} />
                </List.Item>
            </List>
            <Button onClick={this.submitRating} color='blue'>Submit Rating</Button>
            </Card >
        </div>
      </div>
    )
  }
}

export default RateMeal;