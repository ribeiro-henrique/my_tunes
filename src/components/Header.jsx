import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nameUser: '',
    loading: false,
  };

  componentDidMount() {
    this.getUser();
  }

  handleUser = async () => {
    const { loading, nameUser } = this.state;
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
      <header data-testid="header-component">
        { loading ? <p>Carregando...</p> : (
          <p data-testid="header-user-name">
            { nameUser }
          </p>
        ) }
      </header>
    );
  }
}

export default Header;
