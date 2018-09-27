import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

const title = 'ctrl+Accomplish!!!';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();