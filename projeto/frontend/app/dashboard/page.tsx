'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-guard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch('http://localhost:3000/api/posts'),
          fetch('http://localhost:3000/api/users')
        ]);

        if (postsRes.ok && usersRes.ok) {
          const postsData = await postsRes.json();
          const usersData = await usersRes.json();

          setPosts(postsData);
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: '#666' }}>Bem-vindo ao seu painel de controle, {user?.name}!</p>
      </div>

      {/* Cards de Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="card">
          <div className="card-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>Total de Posts</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
                  {isLoading ? '...' : posts.length}
                </p>
              </div>
              <div style={{ fontSize: '2rem' }}>📚</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>Usuários</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
                  {isLoading ? '...' : users.length}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>Comunidade ativa</p>
              </div>
              <div style={{ fontSize: '2rem' }}>👥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Ações Rápidas</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/posts" className="button button-primary">
              👁️ Ver Posts Públicos
            </Link>
            <Link href="/" className="button button-outline">
              🏠 Ir para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}