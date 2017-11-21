import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { connect } from "react-redux";
import logo from './logo.svg';
import imageSearch from './api/api.js';
import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

  }

  onClick(event) {
    console.log(event);
  }



  render() {
    let thumbStyle = {
      backgroundImage: `url(${this.state.link})`,
      height: '600px',
      width: '600px'
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Thumbnail Finder</h1>
        </header>
        <div className="app-body">
          <div className="search-container">
            <input className="thumb-url" type="text"/>
            <button className="thumb-button" onClick={this.onClick}> Search </button>
          </div>
          <div className="image-container">
            <div className="error-box"> 
              <span> {this.state.error ? "Error found" : ""} </span>
              <span> {this.state.pending ? "Stopped looking" : ""} </span>
            </div>
            <div className="thumb-image" style={thumbStyle}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
