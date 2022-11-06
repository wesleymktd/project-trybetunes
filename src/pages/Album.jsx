import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    listAlbum: {},
    listMusic: [],
    hideLoading: false,
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

  handleChange = async ({ target }) => {
    const {
      match: {
        params: { id },
      } } = this.props;
    const { checked } = target;
    if (checked) {
      this.setState({
        hideLoading: true,
      });
      await addSong(id);
    }
    this.setState({
      hideLoading: false,
    });
  };

  render() {
    const { hideLoading } = this.state;
    const { listMusic, listAlbum } = this.state;
    return (
      <div>
        {hideLoading && <Loading /> }
        <div data-testid="page-album">
          <Header />
          <h4 data-testid="artist-name">
            {listAlbum.artistName}
          </h4>
          <h4 data-testid="album-name">
            {listAlbum.collectionName}
          </h4>
          {listMusic.map((music) => (
            <MusicCard
              { ...music }
              handleChange={ this.handleChange }
              key={ music.trackId }
            />
          ))}
        </div>
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
