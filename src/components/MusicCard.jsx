import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorited: false,
  };

  componentDidMount() {
    this.handleFavorite();
  }

  handleFavorite = async (event) => {
    const { trackId } = this.props;
    const { checked } = event.target;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(trackId);
    }
    this.setState({
      loading: false,
      favorited: checked,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorited } = this.state;
    return (
      <div>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {
          loading ? <p>Carregando...</p> : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleFavorite }
                checked={ favorited }
              />
            </label>
          )
        }

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
