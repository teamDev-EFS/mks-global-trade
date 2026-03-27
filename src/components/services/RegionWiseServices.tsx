import React from 'react';
import { IndianRupee, Flag, Users, ShieldCheck, Truck, Package, Globe2, Link2, MapPin } from 'lucide-react';

const indiaServices = [
  { icon: <Package className="w-5 h-5 text-green-700" />, text: 'Bulk product sourcing' },
  { icon: <Users className="w-5 h-5 text-green-700" />, text: 'Supplier network management' },
  { icon: <ShieldCheck className="w-5 h-5 text-green-700" />, text: 'Quality inspection' },
  { icon: <Truck className="w-5 h-5 text-green-700" />, text: 'Packaging & dispatch' },
];

const uaeServices = [
  { icon: <Globe2 className="w-5 h-5 text-green-700" />, text: 'Import/export coordination' },
  { icon: <Link2 className="w-5 h-5 text-green-700" />, text: 'Buyer connection support' },
  { icon: <Truck className="w-5 h-5 text-green-700" />, text: 'Supply chain facilitation' },
  { icon: <MapPin className="w-5 h-5 text-green-700" />, text: 'Local distribution assistance' },
];

const RegionWiseServices: React.FC = () => {
  return (
    <section id="regions" className="scroll-mt-28 py-14 bg-white border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">Region-wise Export Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* India Services */}
          <div className="bg-surface-1 rounded-2xl shadow p-7 flex flex-col">
            <div className="flex items-center mb-4">
              <img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/in.svg" alt="India" className="w-7 h-7 mr-2 rounded shadow" />
              <span className="text-lg font-bold text-green-800">India Services</span>
            </div>
            <ul className="space-y-4 mt-2">
              {indiaServices.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 text-base">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* UAE Services */}
          <div className="bg-surface-1 rounded-2xl shadow p-7 flex flex-col">
            <div className="flex items-center mb-4">
              <img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/ae.svg" alt="UAE" className="w-7 h-7 mr-2 rounded shadow" />
              <span className="text-lg font-bold text-green-800">UAE Services</span>
            </div>
            <ul className="space-y-4 mt-2">
              {uaeServices.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 text-base">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionWiseServices;
