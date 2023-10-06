import { useState } from 'react';
import MeasurePage from './components/MeasurePage';
import Menu from './components/Menu';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
require('bootstrap');

function App() {
  return (
    <div className="App container">
      <div className='row'>
        <Menu />
      </div>
      <div className='row'>
        <MeasurePage />
      </div>
    </div >
  );
}

export default App;