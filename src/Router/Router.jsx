import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { endpoints } from "../constants";
import { Dashboard } from "../components/Dashboard";
import { Sent } from "../components/Sent";
import { Received } from "../components/Received";
import { Bookmarks } from "../components/Bookmarks";
import { Deleted } from "../components/Deleted";
import { Notifications } from "../components/Notifications";
import { GeneralTickets } from "../components/GeneralTickets";
import { Settings } from "../components/Settings";
import { Profile } from "../components/Profile";
import { ErrorPage } from "../components/ErrorPage";

const Router = () => {
  return (
    <Routes>
      <Route path={endpoints.base} element={<Layout />}>
        <Route index element={<GeneralTickets />}></Route>
        <Route path={endpoints.dashboard} element={<Dashboard />} />
        <Route path={endpoints.sent} element={<Sent />} />
        <Route path={endpoints.received} element={<Received />} />
        <Route path={endpoints.bookmarks} element={<Bookmarks />} />
        <Route path={endpoints.deleted} element={<Deleted />} />
        <Route path={endpoints.notifications} element={<Notifications />} />
        <Route path={endpoints.generalTickets} element={<GeneralTickets />} />
        <Route path={endpoints.settings} element={<Settings />} />
        <Route path={endpoints.profile} element={<Profile />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
