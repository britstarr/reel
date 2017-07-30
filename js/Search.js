import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowCard from './ShowCard';
import Header from './Header';
import { arrayOf, shape, string } from 'prop-types';

class Search extends Component {
  constructor (props) {
    super(props);

    this.filterShows = this.filterShows.bind(this);
  }

  filterShows (show) {
    return `${show.title} ${show.description}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0;
  }

  render () {
    return (
      <div className='search'>
        <Header showSearch />
        <div>
          { this.props.shows
            .filter(this.filterShows)
            .map((show) => {
              return (
                <ShowCard key={show.imdbID} {...show} />
              );
            })}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shows: arrayOf(shape({
    title: string,
    description: string
  })),
  searchTerm: string
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(Search);
