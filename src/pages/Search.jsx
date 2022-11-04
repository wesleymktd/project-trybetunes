import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchName: '',
    isButtonDisabled: true,
  };

  validateButton = () => {
    const { searchName } = this.state;
    const number3 = 2;
    const verifiq = searchName.length < number3;
    this.setState({
      isButtonDisabled: verifiq,
    });
  };

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  render() {
    const { searchName, isButtonDisabled } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="searchName"
            value={ searchName }
            onChange={ this.handleForm }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
