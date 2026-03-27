import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminAuth } from '../../context/AdminAuthContext';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required'),
});

type Form = z.infer<typeof schema>;

export default function AdminLogin() {
  const { login, token } = useAdminAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [token, navigate]);

  const onSubmit = async (data: Form) => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f3d24] via-emerald-900 to-[#1a5c38] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">MSK Global Trade</h1>
          <p className="text-gray-500 text-sm mt-1">Admin sign in</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              {...register('email')}
            />
            {errors.email ? <p className="text-red-600 text-sm mt-1">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              {...register('password')}
            />
            {errors.password ? <p className="text-red-600 text-sm mt-1">{errors.password.message}</p> : null}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg disabled:opacity-60 transition-colors"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        {import.meta.env.DEV ? (
          <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
            Dev tip: create the admin in MongoDB with{' '}
            <code className="bg-gray-100 px-1 rounded text-gray-700">npm run seed</code> in{' '}
            <code className="bg-gray-100 px-1 rounded text-gray-700">backend/</code> — credentials come from{' '}
            <code className="bg-gray-100 px-1 rounded text-gray-700">ADMIN_DEFAULT_EMAIL</code> and{' '}
            <code className="bg-gray-100 px-1 rounded text-gray-700">ADMIN_DEFAULT_PASSWORD</code> in{' '}
            <code className="bg-gray-100 px-1 rounded text-gray-700">backend/.env</code>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
