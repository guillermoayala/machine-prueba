import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Enrutador from '../src/components/Menu/Enrutador'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Header from '../src/components/Menu/Header'
import Lateral from '../src/components/Menu/Lateral'


function App() {


  return (
    <Router>
      <div >
        <Enrutador />
      </div>
    </Router>
  );
}

export default App;
