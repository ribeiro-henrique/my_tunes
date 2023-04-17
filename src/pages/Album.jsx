import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

// verificar o obj history
// fazer a requisição de musicas com getMusics
// criar tag para render musicas

class Album extends React.Component {
  state = {
    album: [],
    songs: [],
    loading: false,

  };

  componentDidMount() {
    this.handleAlbum();
  }

  handleAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const pickedAlbum = await getMusics(id);
    this.setState({
      album: pickedAlbum[0], // first element com info do album
      songs: pickedAlbum,
    });
  };

  /*   [
    {
      artistId: 12,
      artistName: "Artist Name",
      collectionId: 123,
      collectionName: "Collection Name",
      collectionPrice: 12.25,
      artworkUrl100: "https://url-to-image",
      releaseDate: "2012-03-02T08:00:00Z",
      trackCount: 8,
    }
  ]
 */

  // music api, trackId, artistName, collectionName

  render() {
    const { album, songs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ album.artistName }</h2>
        <img src={ album.artworkUrl100 } alt={ album.artistName } />
        <h3 data-testid="album-name">{ album.collectionName }</h3>
        {
          loading ? <p>Carregando...</p> : (
            <div>
              { songs.slice(1).map((music) => ( // método slice, pois a api é zuada
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                  />
                </div>
              )) }
            </div>
          )
        }
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
