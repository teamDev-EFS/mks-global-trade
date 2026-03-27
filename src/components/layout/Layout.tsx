import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { OrganizationJsonLd, WebSiteJsonLd } from '../seo/JsonLd';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
