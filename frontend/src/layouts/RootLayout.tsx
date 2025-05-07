import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
