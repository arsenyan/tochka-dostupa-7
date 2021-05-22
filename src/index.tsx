import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import { hydrate, render } from "react-dom"
import App from './App'

const rootComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement.hasChildNodes()) {
  hydrate(rootComponent, rootElement);
} else {
  render(rootComponent, rootElement);
}
