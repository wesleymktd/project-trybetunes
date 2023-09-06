import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../img/logo.png';
import '../css/header.css';

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
      <header data-testid="header-component" className="container-header">
        <Link to="/">
          <img src={ logo } alt="logo" className="logo-header" />
        </Link>
        <nav className="nav">
          <Link
            data-testid="link-to-search"
            className="link-header"
            to="/search"
          >
            <FaSearch className="icon" />
          </Link>
          <Link
            data-testid="link-to-favorites"
            className="link-header"
            to="/favorites"
          >
            <MdFavorite className="icon" />
          </Link>
          <Link
            data-testid="link-to-profile"
            className="link-header"
            to="/profile"
          >
            <CgProfile className="icon" />
          </Link>
        </nav>
        {
          charge ? <Loading />
            : (
              <div
                className="user-header"
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
