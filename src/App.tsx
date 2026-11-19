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

type ActiveRoute =
  | { page: 'home' }
  | { page: 'articles'; articleId?: string | null };

function parseHashRoute(): ActiveRoute {
  if (typeof window === 'undefined') return { page: 'home' };
  const hash = window.location.hash;
  if (hash.startsWith('#/articles')) {
    const parts = hash.split('/');
    return { page: 'articles', articleId: parts[2] || null };
  }
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(parseHashRoute);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToArticlesHub = (articleId?: string) => {
    const targetHash = articleId ? `#/articles/${articleId}` : '#/articles';
    window.location.hash = targetHash;
    setRoute({ page: 'articles', articleId: articleId || null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {route.page === 'articles' ? (
        <ArticlesHubPage
          initialArticleId={route.articleId}
          onBackHome={navigateToHome}
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
