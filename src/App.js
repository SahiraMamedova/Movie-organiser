import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
// Styles
import './common.css';
import './reset.css';
import { Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/list/:id" exact component={ListPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
