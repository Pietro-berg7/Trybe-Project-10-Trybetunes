import React, { Component } from 'react';
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
        <p data-testid="header-user-name">
          { loading ? <Loading /> : name }
        </p>
      </header>
    );
  }
}
