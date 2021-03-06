import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import logo from './logo.svg';
import {Api} from './api/api.js';
import './styles/App.css';

class App extends Component {

  // Setting initial app state
  constructor() {
    super();
    this.state = {
      image: null,
      url: '',
      error: null,
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // Button on click event, 
  onClick(event) {
    this.setState({
      error: null,
      loading: true
    });

    // Send api call to server for thumbnail
    const promise = Api.postUrl(this.state.url);

    // Resolve call and update set with success or failure
    Promise.resolve(promise)
    .then((res) => {
      console.log('response', res);
      this.setState({
        error: res.response.error,
        image: res.response.imagePath,
        loading: false
      });
    });
  }

  onChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  render() {
    let imageLink = this.state.image ? `http://localhost:5000/${this.state.image}` : null
    let thumbStyle = {
      backgroundImage: `url(${imageLink})`,
      backgroundSize: '769px 432px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      height: '500px'
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Thumbnail Finder</h1>
        </header>
        <div className="app-body">
          <div className="search-container">
            <input className="thumb-url" type="text" onChange={this.onChange}/>
            <Button 
              className="thumb-button" 
              onClick={this.onClick}
              disabled={this.state.loading}
            > 
              {this.state.loading ? 'Loading...' : 'Create'}
            </Button>
          </div>
          <div className="image-container">
            <div className="thumb-image" style={thumbStyle}>
              <div className="error-box"> 
                <span className="error-message"> {this.state.error ? "Error found" : ""} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
