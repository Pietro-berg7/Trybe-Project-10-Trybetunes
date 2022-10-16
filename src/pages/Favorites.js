import React, { Component } from 'react';
import { shape } from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs/* , removeSong */ } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    loading: false,
    favorites: [],
  };

  componentDidMount() {
    this.getFavoriteSongs();
  }

  componentDidUpdate() {
    this.updateFavSongs();
  }

  updateFavSongs = async () => {
    const { music } = this.props;
    const result = await getFavoriteSongs(music);
    this.setState({
      favorites: result,
    });
  };

  getFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const { music } = this.props;
    const result = await getFavoriteSongs(music);
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
        { favorites
          .map((element) => (<MusicCard
            key={ element.trackName }
            music={ element }
          />)) }
      </div>
    );
  }
}

Favorites.propTypes = {
  music: shape,
}.isRequired;
