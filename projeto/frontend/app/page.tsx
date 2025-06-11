/* frontend/app/page.tsx */
import Link from 'next/link';

export default function Home() {
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

      <main>
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Bem-vindo ao Blog App</h1>
            <p className="hero-description">
              Uma plataforma para compartilhar suas ideias e conectar-se com outros escritores.
            </p>
            <div className="button-group">
              <Link href="/login" className="button button-primary">Começar agora</Link>
              <Link href="/posts" className="button button-outline">Ver posts</Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2 className="section-title">Recursos</h2>
            <p className="text-center mb-4">Explore os recursos do nosso aplicativo de blog.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✏️</div>
                <h3 className="feature-title">Crie Posts</h3>
                <p>Compartilhe suas ideias com o mundo.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3 className="feature-title">Comente</h3>
                <p>Interaja com outros escritores.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">👤</div>
                <h3 className="feature-title">Perfil</h3>
                <p>Gerencie seu perfil e publicações.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">© 2024 Blog App. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}