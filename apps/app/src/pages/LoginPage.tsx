import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { t } from '../textes';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(email, password, tenantName);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('login.erreur'));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white text-center">{t('login.titre')}</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {isRegister && (
          <input
            type="text"
            placeholder={t('login.nomEntreprise')}
            value={tenantName}
            onChange={e => setTenantName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        )}
        <input
          type="email"
          placeholder={t('login.email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder={t('login.motDePasse')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium transition">
          {isRegister ? t('login.creerCompte') : t('login.connexion')}
        </button>
        <button type="button" onClick={() => setIsRegister(!isRegister)} className="w-full text-sm text-slate-400 hover:text-white transition">
          {isRegister ? t('login.dejaCompte') : t('login.pasDeCompte')}
        </button>
      </form>
    </div>
  );
}
