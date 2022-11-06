import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FoundSearch extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div>
        <p>{artistId}</p>
        <p>{artistName}</p>
        <p>{collectionId}</p>
        <p>{collectionName}</p>
        <p>{collectionPrice}</p>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{releaseDate}</p>
        <p>{trackCount}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Coleção
        </Link>
      </div>
    );
  }
}

FoundSearch.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.string.isRequired,
};

export default FoundSearch;
