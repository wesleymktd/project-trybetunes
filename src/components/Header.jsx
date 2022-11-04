import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    charge: true,
    nameLogin: '',
  };

  async componentDidMount() {
    const users = await getUser();
    this.setState({
      charge: false,
      nameLogin: users.name,
    });
  }

  render() {
    const { charge, nameLogin } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {
          charge ? <Loading />
            : (
              <div
                data-testid="header-user-name"
              >
                { nameLogin }
              </div>)
        }
      </header>
    );
  }
}

export default Header;
