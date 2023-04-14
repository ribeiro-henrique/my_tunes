import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ // recebe a string digitada no input
      name: value,
    });
  };

  handleUser = async () => { // conecta com a API, por isso async
    const { name } = this.state;
    const { history } = this.props; // history é uma prop do Router, permite navegar entre rotas
    this.setState({
      loading: true,
    });
    await createUser({ name }); // passando p createUser meu nome no state
    history.push('/search');
  };

  render() {
    const { name, loading } = this.state;

    const TRES = 3;

    return (
      <div data-testid="page-login">
        {
          loading ? <p>Carregando...</p> : ( // se loading for true, substituo meu form por <p>
            <form>
              <label htmlFor="login-inp">
                Insira seu nome:
                <input
                  value={ name }
                  onChange={ this.handleChange } // pega a string e seta no state
                  id="login-inp"
                  data-testid="login-name-input"
                />
              </label>
              <button
                data-testid="login-submit-button"
                onClick={ this.handleUser }
                disabled={ name.length < TRES } // pegando name do state, se for < 3 disabled é true
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
