import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';

export default class Album extends Component {
  state = {
    musicList: [],
    artist: '',
    album: '',
    image: '',
  };

  componentDidMount() {
    this.handleGetMusics();
  }

  handleGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      musicList: result,
      artist: result[0].artistName,
      album: result[0].collectionName,
      image: result[0].artworkUrl100,
    });
  };

  render() {
    const { artist, album, musicList, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album__div">
          <section className="album__section">
            <img className="album__img" src={ image } alt={ album } />
            <aside className="album__aside">
              <h2 className="album__h2" data-testid="artist-name">{ artist }</h2>
              <h3 className="album__h3" data-testid="album-name">{ album }</h3>
            </aside>
          </section>
          <ul className="album__ul">
            { musicList
              .filter((element) => element.kind === 'song')
              .map((element) => (
                <MusicCard key={ element.trackName } music={ element } />
              )) }
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: shape,
  params: shape,
  id: string,
}.isRequired;
