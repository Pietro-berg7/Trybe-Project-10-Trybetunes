import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
          { loading ? <Loading /> : name }
          <Link
            className="nav"
            data-testid="link-to-search"
            to="/search"
          >
            Search
          </Link>
          <Link
            className="nav"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>
          <Link
            className="nav"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>
        </div>
      </header>
    );
  }
}
