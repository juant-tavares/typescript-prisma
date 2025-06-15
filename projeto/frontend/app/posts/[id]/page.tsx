'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
  author?: { name: string };
  createdAt?: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const postId = parseInt(params.id);

  useEffect(() => {
    // Verificar se há um usuário logado
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();

          // Verificar se o post está publicado
          if (!data.published) {
            setError('Este post não está disponível');
            return;
          }

          setPost(data);
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o post');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data desconhecida';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <header className="header">
          <div className="container header-content">
            <Link href="/" className="logo">Blog App</Link>
          </div>
        </header>
        <main style={{ padding: '2rem 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <p>Carregando post...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <header className="header">
          <div className="container header-content">
            <Link href="/" className="logo">Blog App</Link>
          </div>
        </header>
        <main style={{ padding: '2rem 0' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops!</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>{error}</p>
            <Link href="/posts" className="button button-primary">
              ← Voltar aos posts
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">Blog App</Link>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/posts" className="button button-outline">← Voltar aos posts</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="button button-outline">📊 Dashboard</Link>
                <button onClick={handleLogout} className="button button-outline">🚪 Sair</button>
              </>
            ) : (
              <Link href="/login" className="button button-outline">🔑 Login</Link>
            )}
          </nav>
        </div>
      </header>

      <main style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <article className="card">
            <div className="card-header">
              <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1rem' }}>
                {post.title}
              </h1>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                color: '#666',
                fontSize: '1rem'
              }}>
                <span>por {post.author?.name || 'Autor desconhecido'}</span>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <div className="card-content">
              <div style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}>
                {post.content || 'Este post não tem conteúdo.'}
              </div>
            </div>
            <div style={{ 
              padding: '1rem 1.5rem',
              borderTop: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>
                Post #{post.id}
              </span>
              <Link href="/posts" className="button button-outline">
                Ver mais posts
              </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}