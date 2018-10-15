import React from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class GetStarted extends React.Component{

  render(){
    return(
      <div>
        <Header as='h2' icon style={{ 
          margin : '0 auto',
          width : '100%',
          paddingTop: '100px',
          color: '#f4fffe',
          marginTop: '15%',
          textShadow: '-1px 3px 3px rgba(150, 150, 150, 1)'
        }}>
            <Icon name='food' />
            Get Started
            <Header.Subheader style={{ color: '#f4fffe', textShadow: '-1px 3px 3px rgba(150, 150, 150, 1)' }}>
                Welcome to the iMeal App
            </Header.Subheader>
            <Button href="/meals">
                Get Started
            </Button>
        </Header>
      </div>
    )
  }
}

export default GetStarted;