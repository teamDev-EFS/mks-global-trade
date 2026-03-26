import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="py-12 bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Mission</h3>
            <p className="text-gray-600 mt-2">
              To provide high-quality agro and natural products to our global clients, ensuring
              sustainability and excellence in every delivery.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Vision</h3>
            <p className="text-gray-600 mt-2">
              To be the leading exporter of agro and natural products, recognized for our
              commitment to quality and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;