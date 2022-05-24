import './css/App.css';
import './css/Page.css';

import React from 'react';

import { Link, Outlet } from 'react-router-dom';

function App() {
  
  
  return (
      <div className="App">
        <div className="cabinet">
          <nav>
            <Link to="/0">First Page</Link><br />
            <Link to="/1">Second Page</Link>
          </nav>
        </div>
        <Outlet />
      </div>
    )
}

export default App;
