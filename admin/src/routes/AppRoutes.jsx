import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "../Component/Layout/MainLayout";

// Auth
import Login from "../Pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Dashboard from "../Pages/dashboard/Dashboard";
import Settings from "../Pages/settings/Settings";
import BannerCreate from "../Pages/master/banner";
import Guest from "../Pages/master/guest";
import GuestList from "../Pages/master/guest-list";
import RolePage from "../Pages/master/role";
import EpisodeList from "../Pages/master/episode-list";
import EpisodeCreate from "../Pages/master/episode-add";
import BannerList from "../Pages/master/banner-list"
import ContentList from "../Pages/quick-link/quick-list";
import ContentAdd from "../Pages/quick-link/quick-add";
import EventAdd from "../Pages/media/upcoming-events-add";
import EventList from "../Pages/media/upcoming-events-list";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 Public Route */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default Route */}
        <Route path="/" element={<Dashboard />} />

        <Route path="banner" element={<BannerCreate />} />
        <Route path="/banner-edit/:id" element={<BannerCreate />} />
        <Route path="guest" element={<GuestList />} />
        <Route path="/guest/add" element={<Guest />} />
        <Route path="/guest/edit/:id" element={<Guest />} />
        <Route path="role" element={<RolePage />} />
        <Route path="episode-add" element={<EpisodeCreate />} />
        <Route path="/episode/edit/:id" element={<EpisodeCreate />} />
        <Route path="episode-list" element={<EpisodeList />} />
        <Route path="banner-list" element={<BannerList />} />
        <Route path="/content-list" element={<ContentList />} />
        <Route path="/content/:type" element={<ContentAdd />} />
        <Route path="/content" element={<ContentAdd />} />
        <Route path="/event-add" element={<EventAdd/>} />
<Route path="/event-edit/:id" element={<EventAdd />} />
<Route path="/event-list" element={<EventList />} />

        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
