import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminFetch } from '../../api/adminClient';

const COLORS = ['#0f766e', '#ea580c', '#ca8a04', '#2563eb', '#7c3aed'];

export default function AdminAnalyticsPage() {
  const [countries, setCountries] = useState<{ rows: { country: string; count: number; pct: number }[]; total: number } | null>(null);
  const [products, setProducts] = useState<{ rows: { product: string; count: number }[] } | null>(null);
  const [trend, setTrend] = useState<{ buckets: { _id: string; count: number }[] } | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    adminFetch<{ rows: { country: string; count: number; pct: number }[]; total: number }>('/api/admin/analytics/countries').then(setCountries);
    adminFetch<{ rows: { product: string; count: number }[] }>('/api/admin/analytics/products').then(setProducts);
  }, []);

  useEffect(() => {
    adminFetch<{ buckets: { _id: string; count: number }[] }>(`/api/admin/analytics/trends?days=${days}`).then(setTrend);
  }, [days]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & reports</h2>
        <p className="text-gray-500 text-sm">Country mix, product demand, and trends</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Enquiry trend</h3>
          <select
            className="border rounded-lg px-3 py-1.5 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend?.buckets || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Country ranking</h3>
          <div className="overflow-x-auto max-h-80">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Country</th>
                  <th className="pb-2">Count</th>
                  <th className="pb-2">%</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {countries?.rows.map((r) => (
                  <tr key={r.country} className="border-b border-gray-50">
                    <td className="py-2">{r.country}</td>
                    <td className="py-2">{r.count}</td>
                    <td className="py-2">{r.pct}%</td>
                    <td className="py-2">
                      <Link
                        to={`/admin/enquiries?country=${encodeURIComponent(r.country)}`}
                        className="text-orange-600 text-xs hover:underline"
                      >
                        Filter
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Top products</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={(products?.rows || []).slice(0, 8).map((p) => ({ name: p.product, value: p.count }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {(products?.rows || []).slice(0, 8).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
