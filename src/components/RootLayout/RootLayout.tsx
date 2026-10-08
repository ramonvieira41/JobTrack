import { Outlet, ScrollRestoration, useNavigate } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';
import { useAuthContext } from '@/hooks/useAuthContext';

export function RootLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    void navigate({ to: '/login' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        <Outlet key={user?.id ?? 'logged-out'} />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
