import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    userName: '',
    userImage: '',
    userEmail: '',
    userDescription: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const result = await getUser();
    const { name, image, email, description } = result;
    this.setState({
      loading: false,
      userName: name,
      userImage: image,
      userEmail: email,
      userDescription: description,
    });
  };

  render() {
    const {
      loading,
      userName,
      userImage,
      userEmail,
      userDescription,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <section>
          <img
            data-testid="profile-image"
            src={ userImage }
            alt={ `${userName} profile pic` }
          />
          <Link
            to="/profile/edit"
          >
            Editar perfil
          </Link>
        </section>
        <h3>Nome</h3>
        <p>{ userName }</p>
        <h3>Email</h3>
        <p>{ userEmail }</p>
        <h3>Descrição</h3>
        <p>{ userDescription }</p>
      </div>
    );
  }
}
