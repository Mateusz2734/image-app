import { Route, Routes } from 'react-router';

import MainPage from '@/pages/main';
import Layout from '@/layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
        <Route path="compress" element={<></>} />
      </Route>
    </Routes>
  );
}