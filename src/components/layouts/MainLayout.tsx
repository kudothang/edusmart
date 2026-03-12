import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./header/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <Outlet />
        </div>
      </main>
 

      <Footer />
    </div>
  );
};

export default MainLayout;