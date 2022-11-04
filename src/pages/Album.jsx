import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends Component {
  render() {
    const {
      album,
      match: {
        params: { id },
      } } = this.props;

    return (
      <div data-testid="page-album">
        <Header />
        { `${album} ${id}` }
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
