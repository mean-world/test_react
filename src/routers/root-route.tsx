import { Routes, Route } from 'react-router-dom';
import Dashboard from 'src/app/dashborad/dashboard';
import Login from 'src/app/login/login';
import ProtectRoute from './protect-route';

/* eslint-disable-next-line */
export interface RootRouteProps {}

export function RootRoute(_props: RootRouteProps) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default RootRoute;
