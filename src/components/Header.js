import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';
import User from './User';

export default class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({
      loading: true,
    });
    const result = await getUser();

    this.setState({
      name: result.name,
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header className="header__header" data-testid="header-component">
        <div className="header__div" data-testid="header-user-name">
          <section className="header__section">
            <h2>
              <span className="header__span">Trybe</span>
              tunes
            </h2>
            { loading ? <Loading /> : <User userName={ name } /> }
          </section>
          <nav className="header__nav">
            <Link
              className="navLink"
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
            <Link
              className="navLink"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
            <Link
              className="navLink"
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}
