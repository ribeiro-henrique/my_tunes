import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    loading: false,
    discs: [],
    artist: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  handleClick = async () => {
    const { name, discs } = this.state;
    this.setState({
      loading: true,
    });
    const fetchAlbum = await searchAlbumsAPI({ name });
    this.setState({
      name: '',
      loading: false,
      discs: [...discs, fetchAlbum],
      artist: name,
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
  render() {
    const { name, loading, artist, discs } = this.state;

    const DOIS = 2;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <p>Carregando...</p> : (
            <form>
              <label htmlFor="search-inp">
                Busque pelo artista:
                <input
                  value={ name }
                  onChange={ this.handleChange }
                  id="search-inp"
                  data-testid="search-artist-input"
                />
              </label>
              <button
                data-testid="search-artist-button"
                disabled={ name.length < DOIS }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          discs.length > 0 ? artist && <p>{`Resultado de álbuns de: ${artist}`}</p> : (
            <span>Nenhum álbum foi encontrado</span>
          )
        }
      </div>
    );
  }
}

export default Search;
