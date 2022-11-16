import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

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
        <div className="card__div">
          <img className="card__img" src={ artworkUrl100 } alt={ collectionName } />
          <p className="card__p">{ collectionName }</p>
          <p className="card__p">{ artistName }</p>
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
