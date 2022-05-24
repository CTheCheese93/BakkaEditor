import logo from './logo.svg';
import './css/App.css';
import './css/Page.css';
import Clock from './TestComponents/Clock';

import React, { useCallback, useMemo } from 'react';

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
