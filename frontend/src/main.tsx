import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/sonner';

import App from "@/app";
import Layout from '@/layout';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
    <Toaster richColors closeButton />
  </React.StrictMode >
);
