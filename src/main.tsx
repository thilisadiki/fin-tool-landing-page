import React from 'react';
import ReactGA from 'react-ga4';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const GA_MEASUREMENT_ID = 'G-42NMWE8582';

ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
