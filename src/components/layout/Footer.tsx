import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">&copy; 2023 MSK Global Trade. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-700">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-green-700">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;