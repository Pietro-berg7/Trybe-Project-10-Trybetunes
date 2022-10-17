import { object } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    button: true,
    userName: '',
    userImage: '',
    userEmail: '',
    userDescription: '',
  };

  componentDidMount() {
    this.getUser();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { userEmail, userName, userDescription, userImage } = this.state;
    if (
      this.validateEmail(userEmail)
      && userDescription !== ''
      && userName !== ''
      && userImage !== ''
    ) {
      this.setState({
        button: false,
      });
    }
  };

  getUser = async () => {
    const result = await getUser();
    const { name, image, email, description } = result;
    this.setState({
      loading: false,
      userName: name,
      userImage: image,
      userEmail: email,
      userDescription: description,
    }, () => this.validateForm());
  };

  updateUser = async () => {
    this.setState({
      loading: true,
    });
    const { userEmail, userName, userDescription, userImage } = this.state;
    const { history } = this.props;
    const user = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    await updateUser(user)
      .then(this.setState({
        loading: false,
      }, () => history.push('/profile')));
  };

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  render() {
    const {
      loading,
      button,
      userEmail,
      userName,
      userDescription,
      userImage,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <label htmlFor="userName">
          <input
            data-testid="edit-input-name"
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="userEmail">
          <input
            data-testid="edit-input-email"
            type="email"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="userDescription">
          <textarea
            data-testid="edit-input-description"
            name="userDescription"
            cols="30"
            rows="10"
            value={ userDescription }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="userImage">
          <input
            data-testid="edit-input-image"
            type="text"
            name="userImage"
            value={ userImage }
            onChange={ this.handleChange }
            required
          />
        </label>
        <button
          data-testid="edit-button-save"
          type="submit"
          disabled={ button }
          onClick={ this.updateUser }
        >
          Salvar
        </button>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: object,
}.isRequired;
