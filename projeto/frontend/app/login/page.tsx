'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Versão simplificada: buscar usuário pelo email
      const response = await fetch(`http://localhost:3000/api/users`);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar usuários');
      }
      
      const users = await response.json();
      const user = users.find((u: any) => u.email === email);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header">
          <h1 className="card-title">Login</h1>
          <p>Entre com seu email para acessar sua conta</p>
        </div>
        <div className="card-content">
          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Removemos o campo de senha temporariamente */}
            <button
              type="submit"
              className="button button-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
        <div className="card-footer" style={{ justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
            Não tem uma conta?{' '}
            <Link href="/register" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}