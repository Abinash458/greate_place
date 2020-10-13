import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placeReducer from './store/reducers/placeReducer';
import { init } from './helpers/db';

init().then(() => {
  console.log("Initialized Database");
}).catch(err => {
  console.log("Initializing DB failed!");
  console.log(err);
})

const rootReducre = combineReducers({
  places: placeReducer
});

const store = createStore(rootReducre, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
