'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
  author?: {
    id: number;
    name: string;
    email: string;
  };
  createdAt?: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        if (response.ok) {
          const data = await response.json();
          // Filtrar apenas posts publicados
          const publishedPosts = data.filter((post: Post) => post.published);
          setPosts(publishedPosts);
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data desconhecida';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">Blog App</Link>
          <nav className="nav">
            <Link href="/login" className="button button-outline">Login</Link>
            <Link href="/register" className="button button-primary">Registrar</Link>
          </nav>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blog Posts</h1>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Explore os posts mais recentes da nossa comunidade de escritores.
          </p>
        </div>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card">
                <div className="card-header">
                  <div style={{ height: '1.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                  <div style={{ height: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '60%' }}></div>
                </div>
                <div className="card-content">
                  <div style={{ height: '4rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
                </div>
                <div className="card-footer">
                  <div style={{ height: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '40%' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {posts.map((post) => (
              <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-header">
                  <h3 className="card-title" style={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical' 
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    por {post.author?.name || 'Autor desconhecido'}
                  </p>
                </div>
                <div className="card-content" style={{ flex: 1 }}>
                  <p style={{ 
                    color: '#666', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical' 
                  }}>
                    {post.content || 'Sem conteúdo'}
                  </p>
                </div>
                <div className="card-footer">
                  <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
                    {formatDate(post.createdAt)}
                  </p>
                  <Link href={`/posts/${post.id}`} className="button button-outline">
                    Ler mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Nenhum post publicado ainda.</p>
            <Link href="/login" className="button button-primary">
              Faça login para criar um post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}