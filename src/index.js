import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.sass';

import "../node_modules/perfect-scrollbar/css/perfect-scrollbar.css"

import { App } from './App/App'

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
