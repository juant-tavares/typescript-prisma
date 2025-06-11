'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthGuard, { useAuth } from '@/components/auth-guard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardContent>{children}</DashboardContent>
    </AuthGuard>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/dashboard/posts', label: 'Meus Posts', icon: '📝' },
    { href: '/dashboard/posts/new', label: 'Novo Post', icon: '➕' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/dashboard" className="logo">Blog Dashboard</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Olá, {user?.name}!</span>
            <button onClick={logout} className="button button-outline">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ 
          width: '250px', 
          backgroundColor: '#fff', 
          borderRight: '1px solid #eee',
          padding: '1rem 0'
        }}>
          <nav>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  color: pathname === item.href ? '#3b82f6' : '#666',
                  backgroundColor: pathname === item.href ? '#f0f9ff' : 'transparent',
                  borderRight: pathname === item.href ? '3px solid #3b82f6' : 'none'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f5f5f5' }}>
          {children}
        </main>
      </div>
    </div>
  );
}