import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios.get('/api/product/brands')
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="App">
        MY APP
      </div>
    );
  }
}

export default App;
