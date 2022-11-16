import React, { Component } from 'react';
import { shape } from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';
import '../styles/Search.css';

export default class Search extends Component {
  state = {
    button: true,
    searchValue: '',
    loading: false,
    albumsList: [],
    result: '',
  };

  handleButtonClick = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { searchValue } = this.state;
    const result = await searchAlbumsAPI(searchValue);
    this.setState({
      albumsList: result,
      loading: false,
      result: `Resultado de álbuns de: ${searchValue}`,
      searchValue: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { searchValue } = this.state;
    const two = 2;
    if (searchValue.length >= two) {
      this.setState({
        button: false,
      });
    }
  };

  render() {
    const {
      button,
      searchValue,
      loading,
      result,
      albumsList,
    } = this.state;

    return (
      <div className="search__div" data-testid="page-search">
        <Header />
        <form className="search__form">
          <label htmlFor="search">
            <input
              className="search__input"
              data-testid="search-artist-input"
              type="text"
              id="search"
              name="searchValue"
              value={ searchValue }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="search__button"
            data-testid="search-artist-button"
            type="submit"
            disabled={ button }
            onClick={ this.handleButtonClick }
          >
            Pesquisar
          </button>
        </form>
        <div>
          { loading ? <Loading /> : (<p className="search__result">{ result }</p>) }
        </div>
        <section className="search__section">
          { albumsList
            .map((music) => (<Card
              key={ music.collectionId }
              music={ music }
            />)) }
          { !albumsList.length
            && (<p className="search__error">Nenhum álbum foi encontrado</p>) }
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  music: shape,
}.isRequired;
