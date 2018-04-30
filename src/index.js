import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducer';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log('store', store)
console.log('state is', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
