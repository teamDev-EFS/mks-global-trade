import React from 'react';

const TrustBadges: React.FC = () => {
  return (
    <section className="bg-surface2 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
        <img src="https://via.placeholder.com/100x50" alt="Trust Badge 1" className="h-12" />
        <img src="https://via.placeholder.com/100x50" alt="Trust Badge 2" className="h-12" />
        <img src="https://via.placeholder.com/100x50" alt="Trust Badge 3" className="h-12" />
      </div>
    </section>
  );
};

export default TrustBadges;
