import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../img/logo.png';
import '../css/login.css';

class Login extends Component {
  state = {
    nameLogin: '',
    isButtonDisabled: true,
    charge: false,
  };

  validateButton = () => {
    const { nameLogin } = this.state;
    const number3 = 3;
    const verifiq = nameLogin.length < number3;
    this.setState({
      isButtonDisabled: verifiq,
    });
  };

  inputForm = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  userInfo = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState({
      charge: true,
    });
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const {
      nameLogin,
      isButtonDisabled,
      charge,
    } = this.state;

    return (
      <section>
        {charge && <Loading />}
        <div data-testid="page-login" className="container-background-login">
          <div className="container">
            <img src={ logo } alt="logo" className="logo-login" />
            <form action="" className="form">
              <input
                className="input"
                data-testid="login-name-input"
                type="text"
                placeholder="Digite seu nome aqui"
                value={ nameLogin }
                name="nameLogin"
                onChange={ this.inputForm }
              />

              <button
                className="button"
                data-testid="login-submit-button"
                type="button"
                disabled={ isButtonDisabled }
                onClick={ this.userInfo }
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
