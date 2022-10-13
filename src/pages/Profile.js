import React, { Component } from 'react';
import Header from './Header';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}
