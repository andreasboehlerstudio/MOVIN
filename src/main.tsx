import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { CookieProvider } from './components/gdpr/CookieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App.tsx';
import './index.css';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <CookieProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookieProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
