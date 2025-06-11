/* frontend/app/login/page.tsx */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha ao fazer login');
      }

      const userData = await response.json();
      
      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
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
          <p>Entre com seu email e senha para acessar sua conta</p>
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
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password" className="form-label">Senha</label>
                <Link href="/forgot-password" style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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