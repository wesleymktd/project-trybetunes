import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, musicFavorite, handleChange } = this.props;
    return (
      <>
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
        <label htmlFor="checkbox-music">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="checkbox-musi"
            checked={ musicFavorite }
            onChange={ handleChange }
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
  musicFavorite: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MusicCard;
