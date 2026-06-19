import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import * as HelmetAsync from 'react-helmet-async';
import { CookieProvider } from './components/gdpr/CookieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App.tsx';
import './index.css';

const helmetModule = HelmetAsync as any;
const helmetFallback = helmetModule["default"] || helmetModule["module.exports"];
const HelmetProvider = helmetModule.HelmetProvider || helmetFallback?.HelmetProvider;

const root = document.getElementById('root')!;
const app = (
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

if (root.childElementCount > 0) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
