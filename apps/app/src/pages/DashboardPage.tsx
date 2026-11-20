import { useAuth } from '../lib/auth';
import { t } from '../textes';

export function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-indigo-400">{t('login.titre')}</h1>
        <button onClick={logout} className="text-sm text-slate-400 hover:text-white transition">
          {t('dashboard.deconnexion')}
        </button>
      </header>
      <main className="p-6">
        <p className="text-slate-400">{t('dashboard.bienvenue')}</p>
      </main>
    </div>
  );
}
