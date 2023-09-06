import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import '../css/album.css';

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
    console.log(listMusic);
    this.setState({
      listAlbum,
      listMusic,
    });
  }

  render() {
    const { hideLoading } = this.state;
    const { listMusic, listAlbum } = this.state;
    return (

      <div data-testid="page-album" className="container-musics">
        <Header />
        <div className="all-album">
          {hideLoading && <Loading /> }
          <div className="title-album">
            <h1 data-testid="album-name" className="h1-album">
              {listAlbum.collectionName}
            </h1>
            <h3 data-testid="artist-name" className="h3-album">
              {listAlbum.artistName}
            </h3>
          </div>
          <ul className="ul-album">
            {listMusic.map((music) => (
              <div key={ music.trackId }>
                <div className="musics-album">
                  <li className="li-album">
                    <MusicCard
                      music={ music }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackId={ music.trackId }
                      key={ music.trackId }
                    />
                  </li>
                </div>
              </div>
            ))}
          </ul>
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
};

export default Album;
