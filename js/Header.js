import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchTerm } from './actionCreators';
import { Link } from 'react-router-dom';
import { func, bool, string } from 'prop-types';

class Header extends Component {
  constructor (props) {
    super(props);

    this.resetSearch = this.resetSearch.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value));
  }

  resetSearch () {
    this.props.dispatch(setSearchTerm(''));
  }

  render () {
    let utilSpace;
    if (this.props.showSearch) {
      utilSpace = <input onChange={this.handleSearchTermChange} value={this.props.searchTerm} type='text' placeholder='Search' />;
    } else {
      utilSpace = (
        <h2>
          <Link to='/search'>
            Back
          </Link>
        </h2>
      );
    }
    return (
      <header>
        <h1>
          <Link onClick={this.resetSearch} to='/'>
            Reel
          </Link>
        </h1>
        {utilSpace}
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: func,
  showSearch: bool,
  searchTerm: string
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(Header);
