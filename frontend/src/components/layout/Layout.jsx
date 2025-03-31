import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-purple-100">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
