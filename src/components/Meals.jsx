import React from 'react';
import { Card, Table, Icon, Tab, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../config';

const API_URL = config.API_URL;

class Meals extends React.Component{
  state = {
    meals: []
  }


  updateMeals = (newMeals) => {
    this.setState({ meals : newMeals });
  }

  deleteMeal = mealid => {
    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;
    console.log(id);

    axios.delete(`${API_URL}/${id}/meals/${mealid}`,{
      headers : {
        'x-access-token': token
      }
    })
    .then(function (response) {
      window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  MealsTable = meals => {
    return (
      <Table color="blue" style={{ width : '75%', margin : '0 auto' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Button color="blue" href="/addmeal"><Icon name="add" /></Button >
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Time Eaten</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {meals.map(meal => {
              const update_url = `/updatemeal/${meal._id}`;
              return(
                <Table.Row key={meal._id}>   
                  <Table.Cell ></Table.Cell>
                  <Table.Cell >{meal.name}</Table.Cell>
                  <Table.Cell>{meal.category}</Table.Cell>
                  <Table.Cell>{meal.amount}</Table.Cell>
                  <Table.Cell>{meal.timeEaten}</Table.Cell>
                  <Table.Cell><a href={update_url} ><Icon name="edit" /></a></Table.Cell>
                  <Table.Cell onClick={() => this.deleteMeal(meal._id)}><Icon name="delete" /></Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table>
    )
  }

  fetchMeals = () => {
    const token = localStorage.getItem('token');
    const userData = jwt.decode(token);
    const { id } = userData;
    

    axios.get(`http://localhost:8080/${id}/meals`,{
      headers : {
        'x-access-token' : token
      }
    })
    .then( response => {
      const fetchedMeals = response.data;
      this.updateMeals(fetchedMeals);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    this.fetchMeals();
  }

  render(){
    const { meals } = this.state;
    return(
      <div style={{ margin : '0 auto', alignItems: 'centre', width: '100%', margin: '0 auto' }} >
        <header><h3>Meals</h3></header>
        {this.MealsTable(meals)}
      </div>
    )
  }
}

export default Meals;