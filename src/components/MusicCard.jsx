import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    hideLoading: false,
    favoriteApi: [],
  };

  async componentDidMount() {
    this.setState({
      hideLoading: true,
    });
    const result = await getFavoriteSongs();
    this.setState({
      hideLoading: false,
      favoriteApi: result,
    });
  }

  handleChange = async ({ target }) => {
    const { music } = this.props;
    const { checked } = target;
    if (checked) {
      this.setState({
        hideLoading: true,
      });
      await addSong(music);
    }
    const result = await getFavoriteSongs();
    this.setState({
      hideLoading: false,
      favoriteApi: result,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { hideLoading, favoriteApi } = this.state;
    return (
      <>
        {hideLoading && <Loading /> }
        <div>
          {trackName}
        </div>
        <audio
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
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            checked={ favoriteApi
              .some((songFavorite) => songFavorite.trackId === trackId) }
            onChange={ this.handleChange }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
