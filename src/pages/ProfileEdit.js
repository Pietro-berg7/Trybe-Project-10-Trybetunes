import { object } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

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
        <section className="profile-edit__section">
          <label className="profile-edit__label" htmlFor="userName">
            Nome:
            <input
              className="profile-edit__inputs"
              data-testid="edit-input-name"
              type="text"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label className="profile-edit__label" htmlFor="userEmail">
            E-mail:
            <input
              className="profile-edit__inputs"
              data-testid="edit-input-email"
              type="email"
              name="userEmail"
              value={ userEmail }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label className="profile-edit__label" htmlFor="userImage">
            Foto de perfil:
            <input
              className="profile-edit__inputs"
              data-testid="edit-input-image"
              type="text"
              name="userImage"
              value={ userImage }
              onChange={ this.handleChange }
              required
              placeholder="Link de uma foto"
            />
          </label>
          <label className="profile-edit__label" htmlFor="userDescription">
            Descrição
            <textarea
              className="profile-edit__textarea"
              data-testid="edit-input-description"
              name="userDescription"
              cols="30"
              rows="10"
              value={ userDescription }
              onChange={ this.handleChange }
              required
            />
          </label>
          <button
            className="profile-edit__button"
            data-testid="edit-button-save"
            type="submit"
            disabled={ button }
            onClick={ this.updateUser }
          >
            Salvar
          </button>
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: object,
}.isRequired;
