import React, { Component } from 'react';
import { shape } from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

export default class Favorites extends Component {
  state = {
    loading: true,
    favorites: [],
  };

  componentDidMount() {
    this.newFavoriteSongs();
  }

  newFavoriteSongs = async () => {
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: result,
    });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        <section className="favorites__section">
          { favorites
            .map((element) => (<MusicCard
              key={ element.trackName }
              music={ element }
              newFavoriteSongs={ this.newFavoriteSongs }
            />)) }
        </section>
      </div>
    );
  }
}

Favorites.propTypes = {
  music: shape,
}.isRequired;
