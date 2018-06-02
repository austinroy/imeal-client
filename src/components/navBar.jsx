import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import logo from '../logo.svg';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

class NavBar extends Component {
  isLoggedIn = () => {
      const token = localStorage.getItem('token');

      if(token){
          const decoded = jwt.decode(token);
          return true;
      } else {
          return false;
      }
  }

  logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }

  render() {

    return (
      <Menu stackable>
        <Menu.Item>
          <img src={logo} alt="logo"/>
        </Menu.Item>

        <Menu.Item
          name='iMeal'
        > 
        <strong>
          iMeal
        </strong>
        </Menu.Item>

        <Menu.Menu position='right' >
          <Menu.Item>
                    {
                        ( this.isLoggedIn() ? ( <a className="navbar-item is-danger" onClick={() => this.logout()}>Log out </a> ) : ( <a style={{display: 'none'}}></a> ))
                    }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar