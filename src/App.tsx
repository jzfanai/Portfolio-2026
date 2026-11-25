import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { CareerTimeline } from './components/CareerTimeline';
import { Expertise } from './components/Expertise';
import { BlogSection } from './components/BlogSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ArticlesHubPage } from './components/ArticlesHubPage';
import { Modals, type ModalType } from './components/Modals';
import { ARTICLES } from './data/articles';
import { useDocumentSEO } from './hooks/useDocumentSEO';

type ActiveRoute =
  | { page: 'home' }
  | { page: 'articles'; articleId?: string | null };

function parseLocationRoute(): ActiveRoute {
  if (typeof window === 'undefined') return { page: 'home' };

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname === '/articles') {
    return { page: 'articles', articleId: null };
  }
  if (pathname.startsWith('/articles/')) {
    const slug = pathname.replace('/articles/', '');
    return { page: 'articles', articleId: slug || null };
  }

  const hash = window.location.hash;
  if (hash.startsWith('#/articles')) {
    const parts = hash.split('/');
    return { page: 'articles', articleId: parts[2] || null };
  }

  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(parseLocationRoute);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const activeArticle =
    route.page === 'articles' && route.articleId
      ? ARTICLES.find((a) => a.id === route.articleId) || null
      : null;

  useDocumentSEO({
    page: route.page,
    article: activeArticle,
  });

  useEffect(() => {
    const onRouteChange = () => {
      setRoute(parseLocationRoute());
    };
    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('hashchange', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      window.removeEventListener('hashchange', onRouteChange);
    };
  }, []);

  const navigateToArticlesHub = (articleId?: string | null) => {
    const targetPath = articleId ? `/articles/${articleId}` : '/articles';
    window.history.pushState(null, '', targetPath);
    setRoute({ page: 'articles', articleId: articleId || null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHomeSection = (sectionId: string) => {
    window.history.pushState(null, '', `/#${sectionId}`);
    setRoute({ page: 'home' });
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <>
      {route.page === 'articles' ? (
        <ArticlesHubPage
          initialArticleId={route.articleId}
          onBackHome={navigateToHome}
          onNavigateSection={navigateToHomeSection}
          onSelectArticleRoute={(id) => {
            const targetPath = id ? `/articles/${id}` : '/articles';
            window.history.pushState(null, '', targetPath);
            setRoute({ page: 'articles', articleId: id });
          }}
          onDownloadCV={() => setActiveModal({ kind: 'cv' })}
          onOpenContact={() => setActiveModal({ kind: 'contact' })}
          onOpenPrivacy={() => setActiveModal({ kind: 'privacy' })}
        />
      ) : (
        <div className="min-h-screen bg-black text-white flex flex-col">
          <main className="flex-1">
            <Hero
              onOpenArticlesHub={() => navigateToArticlesHub()}
              onDownloadCV={() => setActiveModal({ kind: 'cv' })}
            />

            <Introduction />

            <CareerTimeline onDownloadCV={() => setActiveModal({ kind: 'cv' })} />

            <Expertise onHireMe={() => setActiveModal({ kind: 'contact' })} />

            <BlogSection
              onSelectArticle={(article) => navigateToArticlesHub(article.id)}
              onOpenArticlesHub={() => navigateToArticlesHub()}
            />

            <Newsletter onOpenPrivacy={() => setActiveModal({ kind: 'privacy' })} />
          </main>

          <Footer
            onDownloadCV={() => setActiveModal({ kind: 'cv' })}
            onOpenContact={() => setActiveModal({ kind: 'contact' })}
            onOpenArticlesHub={() => navigateToArticlesHub()}
          />
        </div>
      )}

      <Modals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
