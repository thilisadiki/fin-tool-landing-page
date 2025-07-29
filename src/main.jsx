import React from 'react';
import ReactGA from 'react-ga4';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { ThemeProvider } from '@/components/ThemeProvider';

// G4A Measurement ID
const GA_MEASUREMENT_ID = 'G-42NMWE8582'; 

ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);