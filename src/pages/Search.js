import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  state = {
    button: true,
    searchValue: '',
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
    const { button, searchValue } = this.state;
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
