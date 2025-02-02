import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-1 ">
        {/* This will render the matched child route */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
