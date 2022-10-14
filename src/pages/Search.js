import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Search extends Component {
  state = {
    button: true,
    searchValue: '',
    loading: false,
    albumsList: [],
    result: '',
  };

  handleButtonClick = async () => {
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
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            type="text"
            id="search"
            name="searchValue"
            value={ searchValue }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ button }
          onClick={ this.handleButtonClick }
        >
          Pesquisar
        </button>
        <div>
          { loading ? <Loading /> : result }
        </div>
        <section>
          { albumsList
            .map((music) => (<MusicCard
              key={ music.artistId }
              music={ music }
            />)) }
        </section>
        { !albumsList.length && (<p>Nenhum álbum foi encontrado</p>) }
      </div>
    );
  }
}
