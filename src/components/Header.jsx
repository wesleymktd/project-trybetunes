import React, { Component } from 'react';
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
