import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import SwimmingDetailPage from "./pages/SwimmingDetailPage";
import SwimmingListPage from "./pages/SwimmingListPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/swimming", Component: SwimmingListPage },
  { path: "/swimming/:serviceId", Component: SwimmingDetailPage },
]);
