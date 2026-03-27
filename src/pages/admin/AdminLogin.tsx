import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const { login, token } = useAdminAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  React.useEffect(() => {
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [token, navigate]);

  const onSubmit = async (data: LoginForm) => {
    setBusy(true);
    try {
      await login(data.email, data.password);
      toast.success('Signed in');
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#071f15] via-[#0F3D2E] to-[#1a5c3f]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,rgba(30,127,92,0.15),transparent)]" />

      {/* Card */}
      <div className="relative w-full max-w-[420px]">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-stone-200/80 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0F3D2E] mx-auto mb-4 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">MSK Global Trade</h1>
            <p className="text-stone-500 text-sm mt-1">Admin Console Sign In</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                placeholder="admin@mskglobaltrade.com"
                {...register('email')}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && <p className="text-red-600 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-xl bg-[#0F3D2E] text-white text-sm font-semibold shadow-md shadow-emerald-900/10 hover:bg-[#0d3526] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {busy ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {import.meta.env.DEV && (
            <div className="mt-6 p-3 rounded-lg bg-stone-50 border border-stone-100">
              <p className="text-[11px] text-stone-400 leading-relaxed">
                <span className="font-semibold text-stone-500">Dev:</span> Run{' '}
                <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-600 text-[10px]">npm run seed</code> in{' '}
                <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-600 text-[10px]">backend/</code> to create admin credentials.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
