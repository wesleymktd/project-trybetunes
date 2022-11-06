import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    listAlbum: {},
    listMusic: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      } } = this.props;
    const [listAlbum, ...listMusic] = await getMusics(id);
    this.setState({
      listAlbum,
      listMusic,
    });
  }

  render() {
    const { listMusic, listAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">
          {listAlbum.artistName}
        </h4>
        <h4 data-testid="album-name">
          {listAlbum.collectionName}
        </h4>
        {listMusic.map((music) => (
          <MusicCard { ...music } key={ music.trackId } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  album: PropTypes.string.isRequired,
};

export default Album;
