import { createStore, compose } from 'redux';
import rootReducer from '../reducers/reducers';

const store = createStore(rootReducer, compose(
  typeof window === 'object' && typeof window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

export default store;
