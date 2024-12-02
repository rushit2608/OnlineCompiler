import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import {thunk} from 'redux-thunk'; // Correct default import
import { LanguageReducer } from './Reducers/LanguageReducers';
const reducer = combineReducers({
    languageChanged : LanguageReducer
});

const initialState = {};
const middleware = [thunk]; // Middleware should be an array, not an object


const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)) // Spread middleware array
);

export default store;
