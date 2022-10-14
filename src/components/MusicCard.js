import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export default class MusicCard extends Component {
  render() {
    const { music: {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } } = this.props;

    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

MusicCard.propTypes = {
  artistName: string,
  collectionName: string,
  artworkUrl100: string,
}.isRequired;
