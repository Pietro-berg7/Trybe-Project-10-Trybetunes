import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    button: true,
    name: '',
    loading: false,
    redirect: false,
  };

  fetchCreateUser = async () => {
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    const result = await createUser({ name: `${name}` });
    this.setState({
      loading: false,
      redirect: true,
    });
    return result;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { name } = this.state;
    const three = 3;
    if (name.length >= three) {
      this.setState({
        button: false,
      });
    }
  };

  render() {
    const { button, name, loading, redirect } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ button }
            onClick={ this.fetchCreateUser }
          >
            Entrar
          </button>
          { loading && <Loading /> }
          { redirect && history.push('/search')}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Array).isRequired,
};
