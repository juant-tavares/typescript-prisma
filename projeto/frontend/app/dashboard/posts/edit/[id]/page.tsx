'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-guard';

interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const postId = parseInt(params.id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.title);
          setContent(data.content || '');
          setPublished(data.published);
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o post');
      } finally {
        setIsFetching(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!user) {
      setError('Você precisa estar logado para editar um post');
      return;
    }

    // Verificar se o usuário é o autor do post
    if (post && post.authorId !== user.id) {
      setError('Você não tem permissão para editar este post');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha ao atualizar post');
      }

      router.push('/dashboard/posts');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao atualizar o post. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div>
        <h1>Carregando post...</h1>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Editar Post</h1>
        <p style={{ color: '#666' }}>Atualize as informações do seu post</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Detalhes do Post</h2>
        </div>
        <div className="card-content">
          {error && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Título *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do post"
                required
                className="input"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Conteúdo
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo do post"
                rows={10}
                className="input"
                style={{ width: '100%', minHeight: '200px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label htmlFor="published">Publicado</label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => router.back()}
                className="button button-outline"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="button button-primary"
              >
                {isLoading ? 'Salvando...' : 'Atualizar Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}