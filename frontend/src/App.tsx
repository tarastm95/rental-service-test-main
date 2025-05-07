import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ApartmentList from "./pages/ApartmentList";
import ApartmentDetail from "./pages/ApartmentDetail";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import type { ReactNode } from "react";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound.tsx";
interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <ApartmentList /> },
      { path: "apartments", element: <ApartmentList /> },
      {
        path: "apartments/:slug",
        element: (
          <Protected>
            <ApartmentDetail />
          </Protected>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
