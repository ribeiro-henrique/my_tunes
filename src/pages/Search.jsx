import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends React.Component {
  state = {
    name: '',
    loading: false,
    discs: [],
    artist: '',
    showMsg: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const fetchAlbum = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      loading: false,
      discs: fetchAlbum,
      artist: name,
      showMsg: true,
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
    const { name, loading, artist, discs, showMsg } = this.state;

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
        { artist && <p>{`Resultado de álbuns de: ${artist}`}</p> }
        {
          discs.length === 0 ? showMsg && <span>Nenhum álbum foi encontrado</span> : (
            discs.map((e) => (
              <div key={ e.artistId } className="disc">
                <img
                  className="disc-img"
                  src={ e.artworkUrl100 }
                  alt={ e.collectionName }
                />
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                >
                  { e.collectionName }
                </Link>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

export default Search;
