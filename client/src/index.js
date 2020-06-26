import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

Number.prototype.comma = function () {
  if (this === 0)
    return 0;


  let reg = /(^[+-]?\d+)(\d{3})/;
  let n = (this + '');

  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

  return n;
};

String.prototype.comma = function () {
  const num = parseFloat(this);
  if (isNaN(num))
    return "0";

  return num.comma();
};
