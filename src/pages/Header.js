import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { loading ? <Loading /> : name }
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
      </header>
    );
  }
}
