import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

class Header extends React.Component {
  state = {
    nameUser: '',
    loading: false,
  };

  componentDidMount() {
    this.handleUser(); // chama a função após o comp ser
  }

  handleUser = async () => {
    /* const { loading, nameUser } = this.state; */
    this.setState({
      loading: true,
    });
    const pickName = await getUser();
    this.setState({
      nameUser: pickName.name,
      loading: false,
    });
  };

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header className="header-content" data-testid="header-component">
        { loading ? <p>Carregando...</p> : (
          <p data-testid="header-user-name">
            { nameUser }
          </p>
        ) }
        <nav className="nav-bar">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
