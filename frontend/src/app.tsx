import { Route, Routes } from 'react-router';

import Layout from '@/layout';
import CompressPage from '@/pages/compress';
import MainPage from '@/pages/main';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
        <Route path="compress" element={<CompressPage />} />
      </Route>
    </Routes>
  );
}