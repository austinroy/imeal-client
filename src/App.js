import React, { Component } from 'react';
import './App.css';
import NavBar from './components//navBar';

class App extends Component {
  render() {
    return (
      <div className="app">
          <NavBar />
          <div>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default App;
