import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  componentDidMount() {
    this.getFavoriteSongs();
  }

  addSong = async () => {
    this.setState({
      loading: true,
    });
    const { music } = this.props;
    await addSong(music);
    this.setState({
      loading: false,
    });
  };

  getFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const { music } = this.props;
    const { trackId } = music;
    const result = await getFavoriteSongs(music);
    this.setState({
      loading: false,
    });
    if (result.some((element) => element.trackId === trackId)) {
      this.setState({
        check: true,
      });
    } else {
      this.setState({
        check: false,
      });
    }
  };

  removeSong = async () => {
    this.setState({
      loading: true,
    });
    const { music } = this.props;
    await removeSong(music);
    this.setState({
      loading: false,
    });
  };

  handleFavMusic = () => {
    const { check } = this.state;
    const { newFavoriteSongs } = this.props;
    if (check === false) {
      this.setState({
        check: true,
      });
      this.addSong();
      newFavoriteSongs();
    } else if (check === true) {
      this.setState({
        check: false,
      });
      this.removeSong();
      newFavoriteSongs();
    }
  };

  render() {
    const { loading, check } = this.state;
    const { music: { trackId } } = this.props;
    const { music: { trackName, previewUrl } } = this.props;

    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id="favorite"
            onChange={ this.handleFavMusic }
            checked={ check }
          />
        </label>
        {loading && <Loading />}
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: shape,
  trackName: string,
  previewUrl: string,
}.isRequired;
