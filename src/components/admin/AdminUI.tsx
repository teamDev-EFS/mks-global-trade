import React from 'react';
import { Loader2 } from 'lucide-react';

/* ── Shared admin design tokens ── */

export const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  in_progress: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  quoted: 'bg-purple-50 text-purple-700 border-purple-200',
  won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  lost: 'bg-red-50 text-red-700 border-red-200',
  archived: 'bg-stone-100 text-stone-600 border-stone-200',
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-stone-50 text-stone-600 border-stone-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-red-50 text-red-700 border-red-200',
};

export const STATUS_OPTIONS = ['new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'archived'] as const;
export const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;
export const SOURCE_OPTIONS = [
  { value: 'contact_form', label: 'Contact Form' },
  { value: 'product_modal', label: 'Product Modal' },
  { value: 'inquiry_list', label: 'Inquiry List' },
] as const;

/* ── Reusable components ── */

export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}> = ({ title, subtitle, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
    <div>
      <h2 className="text-2xl font-bold text-stone-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-stone-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}> = ({ children, className = '', padding = true }) => (
  <div className={`bg-white rounded-xl border border-stone-200/80 shadow-sm ${padding ? 'p-5' : ''} ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; actions?: React.ReactNode }> = ({ children, actions }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold text-stone-900">{children}</h3>
    {actions}
  </div>
);

export const StatusBadge: React.FC<{ value: string; type?: 'status' | 'priority' }> = ({ value, type = 'status' }) => {
  const colors = type === 'priority' ? PRIORITY_COLORS : STATUS_COLORS;
  const cls = colors[value] || 'bg-stone-100 text-stone-600 border-stone-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-semibold capitalize ${cls}`}>
      {value.replace(/_/g, ' ')}
    </span>
  );
};

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center gap-3 py-16 text-stone-400">
    <Loader2 className="w-5 h-5 animate-spin" />
    <span className="text-sm font-medium">{message}</span>
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 p-5 text-sm">
    <p className="font-medium">Error</p>
    <p className="mt-1 text-red-600">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="mt-3 text-sm font-medium text-red-700 hover:text-red-900 underline">
        Try again
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{ message: string; icon?: React.ReactNode }> = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center py-16 text-stone-400">
    {icon && <div className="mb-3">{icon}</div>}
    <span className="text-sm font-medium">{message}</span>
  </div>
);

export const FilterInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors ${props.className || ''}`}
  />
);

export const FilterSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }> = ({ children, ...props }) => (
  <select
    {...props}
    className={`w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors ${props.className || ''}`}
  >
    {children}
  </select>
);

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }> = ({ children, className = '', ...props }) => (
  <button
    type="button"
    {...props}
    className={`px-4 py-2.5 rounded-lg bg-[#0F3D2E] text-white text-sm font-semibold hover:bg-[#0d3526] disabled:opacity-50 transition-colors ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }> = ({ children, className = '', ...props }) => (
  <button
    type="button"
    {...props}
    className={`px-4 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 disabled:opacity-50 transition-colors ${className}`}
  >
    {children}
  </button>
);
