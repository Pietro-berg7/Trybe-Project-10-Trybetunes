import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  state = {
    check: false,
  };

  async componentDidMount() {
    const { music } = this.props;
    const { trackId } = music;
    const result = await getFavoriteSongs(music);
    if (result.some((element) => element.trackId === trackId)) {
      this.setState({
        check: true,
      });
    } else {
      this.setState({
        check: false,
      });
    }
  }

  addSong = async () => {
    const { music } = this.props;
    await addSong(music);
  };

  removeSong = async () => {
    const { music } = this.props;
    await removeSong(music);
  };

  handleFavMusic = async () => {
    const { check } = this.state;
    const { newFavoriteSongs } = this.props;
    if (check === false) {
      this.setState({
        check: true,
      });
      this.addSong();
    } else if (check === true) {
      this.setState({
        check: false,
      });
      this.removeSong();
      newFavoriteSongs();
    }
  };

  render() {
    const { check } = this.state;
    const { music: { trackId } } = this.props;
    const { music: { trackName, previewUrl } } = this.props;

    return (
      <section className="music-card__section">
        <p className="music-card__p">{ trackName }</p>
        <div className="music-card__div1">
          <audio
            className="music-card__audio"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <div className="music-card__div2">
            <label htmlFor="favorite">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="favorite"
                id="favorite"
                onChange={ this.handleFavMusic }
                checked={ check }
              />
            </label>
          </div>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: shape,
  trackName: string,
  previewUrl: string,
}.isRequired;
