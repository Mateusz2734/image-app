import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/sonner';

import App from "@/app";

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
    <Toaster richColors closeButton />
  </React.StrictMode >
);
