import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MasterProvider from './providers/MasterProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


export const Context = React.createContext({})

root.render(
    <MasterProvider>
      <App />
    </MasterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
