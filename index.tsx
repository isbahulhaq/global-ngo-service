
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Initializing Global NGO Service App...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element with id 'root'");
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
