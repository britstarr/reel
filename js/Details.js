import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOMDBDetails } from './actions/actioncreators';
import Header from './Header';
import { shape, string, func } from 'prop-types';

class Details extends Component {
  componentDidMount () {
    if (!this.props.omdbData.imdbRating) {
      this.props.dispatch(getOMDBDetails(this.props.show.imdbID));
    }
  }

  render () {
    const { title, description, year, poster, trailer } = this.props.show;
    let rating;
    if (this.props.omdbData.imdbRating) {
      rating = <h3>{this.props.omdbData.imdbRating}</h3>;
    } else {
      rating = <img src='/public/img/loading.png' alt='loading indicator' />;
    }
    return (
      <div className='details'>
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
          <img src={`/public/img/posters/${poster}`} alt={`${title} movie poster`} id='posterAltText' />
          <p>{description}</p>
        </section>
        <div>
          <iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`} frameBorder='0' allowFullScreen />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  show: shape({
    title: string,
    description: string,
    year: string,
    poster: string,
    trailer: string
  }),
  omdbData: shape({
    imdbID: string
  }),
  dispatch: func
};

const mapStatetoProps = (state, ownProps) => {
  const omdbData = state.omdbData[ownProps.show.imdbID] ? state.omdbData[ownProps.show.imdbID] : {};
  return {
    omdbData
  };
};

export default connect(mapStatetoProps)(Details);
