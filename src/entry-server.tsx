import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import * as HelmetAsync from 'react-helmet-async';
import { CookieProvider } from './components/gdpr/CookieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

const helmetModule = HelmetAsync as any;
const helmetFallback = helmetModule["default"] || helmetModule["module.exports"];
const HelmetProvider = helmetModule.HelmetProvider || helmetFallback?.HelmetProvider;

export async function render(url: string) {
  const helmetContext: any = {};
  
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider>
          <CookieProvider>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </CookieProvider>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  );

  return { html, helmetContext };
}
