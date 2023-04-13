import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  handleUser = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { name, loading } = this.state;

    const TRES = 3;

    return (
      <div data-testid="page-login">
        {
          loading ? <p>Carregando...</p> : (
            <form>
              <label htmlFor="login-inp">
                Insira seu nome:
                <input
                  value={ name }
                  onChange={ this.handleChange }
                  id="login-inp"
                  data-testid="login-name-input"
                />
              </label>
              <button
                data-testid="login-submit-button"
                onClick={ this.handleUser }
                disabled={ name.length < TRES }
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
