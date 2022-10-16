import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

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

  favMusic = () => {
    const { check } = this.state;
    if (check === false) {
      this.setState({ check: true });
      this.addSong();
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
            onChange={ this.favMusic }
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
