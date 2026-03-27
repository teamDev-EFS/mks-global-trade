import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { adminFetch } from '../../api/adminClient';

type DashboardData = {
  kpis: {
    total: number;
    new: number;
    contacted: number;
    quoted: number;
    won: number;
    lost: number;
  };
  byCountry: { country: string; count: number }[];
  bySource: { source: string; count: number }[];
  byProduct: { product: string; count: number }[];
  trend: { _id: string; count: number }[];
  recentEnquiries: Record<string, unknown>[];
  activity: {
    type: string;
    description: string;
    adminName?: string;
    createdAt: string;
    enquiryId: string;
    customerName: string;
  }[];
};

const COLORS = ['#0f766e', '#ea580c', '#ca8a04', '#2563eb', '#7c3aed', '#db2777'];

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<DashboardData>('/api/admin/analytics/dashboard')
      .then(setData)
      .catch((e) => setErr(e instanceof Error ? e.message : 'Failed to load'));
  }, []);

  if (err) {
    return <div className="rounded-xl bg-red-50 text-red-800 p-4">{err}</div>;
  }
  if (!data) {
    return <div className="text-gray-500">Loading dashboard…</div>;
  }

  const k = data.kpis;
  const cards = [
    { label: 'Total Enquiries', value: k.total, color: 'bg-emerald-800' },
    { label: 'New', value: k.new, color: 'bg-teal-600' },
    { label: 'Contacted', value: k.contacted, color: 'bg-cyan-700' },
    { label: 'Quoted', value: k.quoted, color: 'bg-amber-600' },
    { label: 'Won', value: k.won, color: 'bg-green-600' },
    { label: 'Lost', value: k.lost, color: 'bg-gray-600' },
  ];

  const sourceData = data.bySource.map((s) => ({
    name: s.source?.replace(/_/g, ' ') || '—',
    value: s.count,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Lead pipeline and regional performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`${c.color} text-white rounded-xl p-4 shadow-md`}>
            <p className="text-xs font-medium opacity-90">{c.label}</p>
            <p className="text-3xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Enquiries by country</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byCountry.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">By source</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Enquiries over time (30 days)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#ea580c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Top products</h3>
          <ul className="divide-y divide-gray-100">
            {data.byProduct.slice(0, 8).map((p) => (
              <li key={p.product} className="py-2 flex justify-between text-sm">
                <span className="text-gray-800">{p.product}</span>
                <span className="font-semibold text-emerald-800">{p.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent activity</h3>
          <ul className="space-y-3 max-h-72 overflow-y-auto">
            {data.activity.slice(0, 15).map((a, i) => (
              <li key={i} className="text-sm border-l-2 border-orange-400 pl-3">
                <span className="text-gray-500 text-xs">{new Date(a.createdAt).toLocaleString()}</span>
                <p className="text-gray-800">
                  <span className="font-medium">{a.enquiryId}</span> · {a.customerName}
                </p>
                <p className="text-gray-600">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Latest enquiries</h3>
          <Link to="/admin/enquiries" className="text-sm text-orange-600 font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 pr-4">ID</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Country</th>
                <th className="pb-2 pr-4">Source</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentEnquiries.map((e) => (
                <tr key={String(e._id)} className="border-b border-gray-50">
                  <td className="py-2 pr-4 font-mono text-xs">
                    <Link to={`/admin/enquiries/${e._id}`} className="text-orange-600 hover:underline">
                      {String(e.enquiryId)}
                    </Link>
                  </td>
                  <td className="py-2 pr-4">{String(e.customerName)}</td>
                  <td className="py-2 pr-4">{String(e.country || '—')}</td>
                  <td className="py-2 pr-4">{String(e.sourceType || '').replace(/_/g, ' ')}</td>
                  <td className="py-2">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium">
                      {String(e.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
