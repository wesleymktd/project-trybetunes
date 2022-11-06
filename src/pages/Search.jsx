import React, { Component } from 'react';
import FoundSearch from '../components/FoundSearch';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    searchName: '',
    artistName: '',
    isButtonDisabled: true,
    hideLoading: false,
    foundResult: false,
    searchInit: false,
    resultSearch: [],
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

  fetchMusic = (searchName) => {
    this.setState({
      hideLoading: true,
      searchName: '',
    }, async () => {
      const result = await searchAlbumsAPI(searchName);
      this.setState({
        hideLoading: false,
        resultSearch: result,
        foundResult: result.length,
        searchInit: true,
        artistName: searchName,
      });
    });
  };

  render() {
    const {
      searchName,
      artistName,
      isButtonDisabled,
      hideLoading,
      resultSearch,
      foundResult,
      searchInit,
    } = this.state;

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
            onClick={ () => this.fetchMusic(searchName) }
          >
            Pesquisar
          </button>
        </div>
        {searchInit && (
          <>
            <h1>
              {!foundResult && 'Nenhum álbum foi encontrado'}
            </h1>
            <ul>
              {hideLoading ? <Loading />
                : (
                  <>
                    {foundResult && `Resultado de álbuns de: ${artistName}`}
                    {resultSearch.map((results) => (
                      <FoundSearch { ...results } key={ results.collectionName } />
                    ))}
                  </>
                )}
            </ul>
          </>
        )}
      </>
    );
  }
}
