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
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import Login from './components/Login.js';
import Lyrics from './components/Lyrics.js'

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log('store', store)
console.log('state is', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={withRouter(App)} />
        <Route path='/song/:id' component={withRouter(Lyrics)} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
