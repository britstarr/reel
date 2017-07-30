import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';
import { setSearchTerm } from './actionCreators';

class Landing extends Component {
  constructor (props) {
    super(props);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value));
  }

  render () {
    return (
      <div className='landing'>
        <h1>Reel</h1>
        <input onChange={this.handleSearchTermChange} value={this.props.searchTerm} type='text' placeholder='Search' />
        <Link to='/search'>or Browse All</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

Landing.propTypes = {
  searchTerm: string,
  dispatch: func
};

export default connect(mapStateToProps)(Landing);
