import React, { Component } from 'react';
import { object } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';

export default class Login extends Component {
  state = {
    button: true,
    name: '',
    loading: false,
    redirect: false,
  };

  fetchCreateUser = async (event) => {
    event.preventDefault();
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
      <>
        <header className="login__header">
          <h1 className="login__h1">
            Trybe
            <span className="login__span">tunes</span>
          </h1>
        </header>
        <div data-testid="page-login">
          <form className="login__form">
            <label htmlFor="name">
              <input
                className="login__input"
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="login__button"
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
      </>
    );
  }
}

Login.propTypes = {
  history: object,
}.isRequired;
