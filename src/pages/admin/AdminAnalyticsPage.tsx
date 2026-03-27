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
  Legend,
} from 'recharts';
import { adminFetch } from '../../api/adminClient';
import { Card, CardTitle, PageHeader, LoadingState, FilterSelect } from '../../components/admin/AdminUI';

const CHART_COLORS = ['#0d9488', '#ea580c', '#ca8a04', '#2563eb', '#7c3aed'];
const DAYS_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
] as const;

type CountryRow = { country: string; count: number; pct: number };
type ProductRow = { product: string; count: number };
type TrendBucket = { _id: string; count: number };

const AdminAnalyticsPage: React.FC = () => {
  const [countries, setCountries] = useState<{ rows: CountryRow[]; total: number } | null>(null);
  const [products, setProducts] = useState<{ rows: ProductRow[] } | null>(null);
  const [trend, setTrend] = useState<{ buckets: TrendBucket[] } | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    adminFetch<{ rows: CountryRow[]; total: number }>('/api/admin/analytics/countries').then(setCountries);
    adminFetch<{ rows: ProductRow[] }>('/api/admin/analytics/products').then(setProducts);
  }, []);

  useEffect(() => {
    adminFetch<{ buckets: TrendBucket[] }>(`/api/admin/analytics/trends?days=${days}`).then(setTrend);
  }, [days]);

  const pieData = (products?.rows || []).slice(0, 8).map((p) => ({ name: p.product, value: p.count }));

  return (
    <div className="space-y-8">
      <PageHeader title="Analytics & Reports" subtitle="Country mix, product demand, and trends" />

      {/* Trend chart */}
      <Card>
        <CardTitle
          actions={
            <FilterSelect
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-auto"
            >
              {DAYS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </FilterSelect>
          }
        >
          Enquiry Trend
        </CardTitle>
        <div className="h-[300px]">
          {trend ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend.buckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="_id" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <LoadingState />
          )}
        </div>
      </Card>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country ranking */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <CardTitle>Country Ranking</CardTitle>
          </div>
          {countries ? (
            <div className="overflow-x-auto max-h-80">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-400 text-xs uppercase tracking-wider border-b border-stone-100">
                    <th className="px-5 pb-2 font-medium">Country</th>
                    <th className="px-5 pb-2 font-medium">Count</th>
                    <th className="px-5 pb-2 font-medium">%</th>
                    <th className="px-5 pb-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {countries.rows.map((r) => (
                    <tr key={r.country} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                      <td className="px-5 py-2.5 text-stone-700">{r.country}</td>
                      <td className="px-5 py-2.5 text-stone-600 tabular-nums">{r.count}</td>
                      <td className="px-5 py-2.5 text-stone-500 tabular-nums">{r.pct}%</td>
                      <td className="px-5 py-2.5">
                        <Link
                          to={`/admin/enquiries?country=${encodeURIComponent(r.country)}`}
                          className="text-emerald-700 text-xs font-medium hover:text-emerald-900"
                        >
                          Filter
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <LoadingState />
          )}
        </Card>

        {/* Product pie chart */}
        <Card>
          <CardTitle>Top Products</CardTitle>
          <div className="h-[280px]">
            {products ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontSize: 11 }}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <LoadingState />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
