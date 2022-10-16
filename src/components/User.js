import React, { Component } from 'react';
import { string } from 'prop-types';

export default class User extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="header__user">
        <img className="header__image" src="https://www.svgrepo.com/show/22146/user.svg" alt="default-user-img" />
        { userName }
      </div>
    );
  }
}

User.propTypes = {
  userName: string,
}.isRequired;
