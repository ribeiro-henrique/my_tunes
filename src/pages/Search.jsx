import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    name: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  render() {
    const { name } = this.state;

    const DOIS = 2;

    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
