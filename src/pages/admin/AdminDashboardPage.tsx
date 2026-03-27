import React, { useCallback, useEffect, useState } from 'react';
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
import { ArrowRight, TrendingUp, Users, CheckCircle2, Clock, XCircle, Inbox } from 'lucide-react';
import { adminFetch } from '../../api/adminClient';
import { Card, CardTitle, StatusBadge, LoadingState, ErrorState, PageHeader } from '../../components/admin/AdminUI';

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

const CHART_COLORS = ['#0d9488', '#ea580c', '#ca8a04', '#2563eb', '#7c3aed', '#db2777'];

const KPI_CONFIG = [
  { key: 'total', label: 'Total', icon: Inbox, color: 'text-stone-600', bg: 'bg-stone-50' },
  { key: 'new', label: 'New', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'contacted', label: 'Contacted', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  { key: 'quoted', label: 'Quoted', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'won', label: 'Won', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { key: 'lost', label: 'Lost', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
] as const;

const AdminDashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    adminFetch<DashboardData>('/api/admin/analytics/dashboard')
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (error) return <ErrorState message={error} onRetry={loadData} />;
  if (!data) return <LoadingState message="Loading dashboard..." />;

  const kpis = data.kpis;
  const sourceData = data.bySource.map((s) => ({
    name: s.source?.replace(/_/g, ' ') || 'Unknown',
    value: s.count,
  }));

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" subtitle="Lead pipeline and regional performance" />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_CONFIG.map(({ key, label, icon: Icon, color, bg }) => (
          <Card key={key} className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500">{label}</p>
              <p className="text-2xl font-bold text-stone-900 mt-0.5">
                {kpis[key as keyof typeof kpis]}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Enquiries by Country</CardTitle>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byCountry.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="country" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardTitle>By Source</CardTitle>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontSize: 11 }}>
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle>Enquiries Over Time (30 Days)</CardTitle>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Line type="monotone" dataKey="count" stroke="#0d9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Top Products</CardTitle>
          <ul className="divide-y divide-stone-100">
            {data.byProduct.slice(0, 8).map((p) => (
              <li key={p.product} className="py-2.5 flex justify-between items-center text-sm">
                <span className="text-stone-700">{p.product}</span>
                <span className="font-semibold text-stone-900 tabular-nums">{p.count}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Recent Activity</CardTitle>
          <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {data.activity.slice(0, 15).map((a, i) => (
              <li key={i} className="text-sm border-l-2 border-emerald-400 pl-3">
                <span className="text-stone-400 text-xs">{new Date(a.createdAt).toLocaleString()}</span>
                <p className="text-stone-700">
                  <span className="font-medium text-stone-900">{a.enquiryId}</span> &middot; {a.customerName}
                </p>
                <p className="text-stone-500 text-xs">{a.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent enquiries table */}
      <Card padding={false}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="font-semibold text-stone-900">Latest Enquiries</h3>
          <Link to="/admin/enquiries" className="text-sm text-emerald-700 font-medium hover:text-emerald-900 inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-stone-500 border-b border-stone-100 text-xs uppercase tracking-wider">
                <th className="px-5 pb-3 font-medium">ID</th>
                <th className="px-5 pb-3 font-medium">Customer</th>
                <th className="px-5 pb-3 font-medium">Country</th>
                <th className="px-5 pb-3 font-medium">Source</th>
                <th className="px-5 pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentEnquiries.map((e) => (
                <tr key={String(e._id)} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs">
                    <Link to={`/admin/enquiries/${e._id}`} className="text-emerald-700 font-semibold hover:text-emerald-900">
                      {String(e.enquiryId)}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-stone-700">{String(e.customerName)}</td>
                  <td className="px-5 py-3 text-stone-500">{String(e.country || '—')}</td>
                  <td className="px-5 py-3 text-stone-500 capitalize">{String(e.sourceType || '').replace(/_/g, ' ')}</td>
                  <td className="px-5 py-3">
                    <StatusBadge value={String(e.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
