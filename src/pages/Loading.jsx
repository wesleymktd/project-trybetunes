import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
  render() {
    return (
      <div>
        <h2 className="loading">Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
