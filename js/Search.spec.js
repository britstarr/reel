import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Search, { Unwrapped as UnwrappedSearch } from './Search';
import { setSearchTerm } from './actions/actionCreators';
import store from './store/store';
import ShowCard from './ShowCard';
import preload from '../public/data.json';

test('Search snapshot test', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm='' />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Search should render a ShowCard for each show', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm='' />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search', () => {
  const searchWord = 'house';
  store.dispatch(setSearchTerm(searchWord));
  const component = render(<Provider store={store}><MemoryRouter><UnwrappedSearch shows={preload.shows} /></MemoryRouter></Provider>);
  const showCount = preload.shows.filter((show) => {
    return `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  }).length;
  expect(component.find('.show-card').length).toEqual(showCount);
});

// test('ShowCard should match search term', () => {
//   const searchTerm = 'house of cards';
//   const card = preload.shows.filter((show) => {
//     return show.title.indexOf(searchTerm) >= 0;
//   });
//   const component = render(<UnwrappedSearch key={card.imdbID} {...card}/>);
//   const tree = shallowToJson(component);
//
//   expect(tree).toEqual(shallowToJson(preload.shows[0]));
// });
