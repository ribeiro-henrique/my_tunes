import React, { Component } from 'react';
import { createUser } from './userAPI';
import LoadingMsg from './LoadingMsg';

class Silvia extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState;
    }
  };

  render() {
    const { name, loading  } = this.state;
    const NUMB = 3;

    return (
      <div>

     { loading ? <LoadingMsg /> : (
      <div>
         <form>
         <label htmlFor="name">
           Insira seu nome
           <input
             data-testid="login-name-input"
             type="text"
             name={ name }
             onChange={ this.handleChange }
             id="name"
           />
           <h1
             data-testid="page-login"
           >
             Login

           </h1>
         </label>
       </form>
       <button
         data-testid="login-submit-button"
         disabled={ name.length < NUMB }
         onClick={ this.handleSubmit }
       >
         {' '}
         Entrar

       </button>
     ) }
      </div>
      

    )
  }


export default Silvia;