import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className = "buttons">
          <Button className = "btn btn-land-button btn-md">
            <Link to='/'>Landing</Link>
          </Button>
          <Button className = "btn btn-lib-button btn-md">
            <Link to='/library'>Library</Link>
          </Button>
          </nav>
          <h1></h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
