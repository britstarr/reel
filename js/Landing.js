import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { string, func, object } from 'prop-types';
import { setSearchTerm } from './actions/actionCreators';

class Landing extends Component {
  constructor (props, context) {
    super(props, context);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.browseAll = this.browseAll.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value));
  }

  handleSearchSubmit (event) {
    event.preventDefault();
    this.context.router.history.push('/search');
  }

  browseAll () {
    this.props.dispatch(setSearchTerm(''));
  }

  render () {
    return (
      <div className='landing'>
        <h1>Reel</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input onChange={this.handleSearchTermChange} value={this.props.searchTerm} type='text' placeholder='Search' />
        </form>

        <Link onClick={this.browseAll} to='/search'>or Browse All</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

Landing.contextTypes = {
  router: object
};

Landing.propTypes = {
  searchTerm: string,
  dispatch: func
};

export default connect(mapStateToProps)(Landing);
