import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router";
import { Toaster } from '@/components/ui/sonner';

import App from "@/app";

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
    <Toaster richColors />
  </React.StrictMode >,
);
