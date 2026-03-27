import React from 'react';
import { UserCheck, PackageSearch, ShieldCheck, Package, Truck, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <UserCheck className="w-8 h-8 text-green-700" />,
    label: 'Requirement Understanding',
  },
  {
    icon: <PackageSearch className="w-8 h-8 text-green-700" />,
    label: 'Product Sourcing',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-700" />,
    label: 'Quality Inspection',
  },
  {
    icon: <Package className="w-8 h-8 text-green-700" />,
    label: 'Packaging',
  },
  {
    icon: <Truck className="w-8 h-8 text-green-700" />,
    label: 'Logistics & Export',
  },
];

const ProcessFlow: React.FC = () => {
  return (
    <section id="export-process" className="scroll-mt-28 py-16 bg-[#F8F6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">How Our Export Process Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center text-center min-w-[160px]">
                <div className="bg-white rounded-full shadow-md p-4 mb-2 border border-gray-100">
                  {step.icon}
                </div>
                <span className="text-green-900 font-semibold text-base mb-1">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-7 h-7 text-orange-400 mx-2 md:mx-4 rotate-90 md:rotate-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
