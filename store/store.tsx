import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // import reducers của bạn

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
