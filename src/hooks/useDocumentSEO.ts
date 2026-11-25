import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ARTICLES, type ArticleItem } from '../data/articles';

interface DocumentSEOOptions {
  page: 'home' | 'articles';
  article?: ArticleItem | null;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useDocumentSEO({ page, article }: DocumentSEOOptions) {
  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : SITE_CONFIG.canonicalUrl.replace(/\/$/, '');

    let title = `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`;
    let description =
      'Jonathan Fanai — SEO Specialist specializing in Organic Marketing, Technical SEO, International SEO, AEO and GEO.';
    let canonicalPath = '/';
    let ogType = 'website';
    let ogImage = `${origin}/assets/images/jonathan-avatar.png`;

    if (page === 'articles' && article) {
      title = `${article.title} | ${SITE_CONFIG.name}`;
      description = article.summary;
      canonicalPath = `/articles/${article.id}`;
      ogType = 'article';
      ogImage = article.imageSrc.startsWith('http')
        ? article.imageSrc
        : `${origin}${article.imageSrc.startsWith('/') ? '' : '/'}${article.imageSrc}`;
    } else if (page === 'articles') {
      title = `Articles & SEO Insights | ${SITE_CONFIG.name}`;
      description =
        'Editorial essays and organic growth insights by Jonathan Fanai covering SEO, SMO, International SEO, Local SEO, AEO, GEO, and Ethical ORM.';
      canonicalPath = '/articles';
      ogType = 'website';
    }

    const canonicalUrl = `${origin}${canonicalPath}`;

    document.title = title;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Update Schema.org JSON-LD per route
    let jsonLdScript = document.getElementById('dynamic-json-ld') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'dynamic-json-ld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    const personSchema = {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.brand,
      url: `${origin}/`,
      image: `${origin}/assets/images/jonathan-avatar.png`,
      jobTitle: SITE_CONFIG.title,
      worksFor: {
        '@type': 'Organization',
        name: SITE_CONFIG.organization,
      },
      email: `mailto:${SITE_CONFIG.contact.email}`,
      telephone: SITE_CONFIG.contact.phoneHref,
      sameAs: [
        'https://www.linkedin.com/in/jzfanai/',
        'https://www.instagram.com/jzfanai',
      ],
    };

    if (page === 'articles' && article) {
      jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${canonicalUrl}#article`,
            headline: article.title,
            description: article.summary,
            articleSection: article.category,
            mainEntityOfPage: canonicalUrl,
            image: ogImage,
            author: personSchema,
            publisher: {
              '@type': 'Person',
              name: SITE_CONFIG.name,
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${origin}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
                item: `${origin}/articles`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: canonicalUrl,
              },
            ],
          },
        ],
      });
    } else if (page === 'articles') {
      jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${canonicalUrl}#collection`,
            url: canonicalUrl,
            name: title,
            description,
            author: personSchema,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: ARTICLES.map((a, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: a.title,
                url: `${origin}/articles/${a.id}`,
              })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${origin}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
                item: canonicalUrl,
              },
            ],
          },
        ],
      });
    } else {
      jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${origin}/#website`,
            url: `${origin}/`,
            name: `${SITE_CONFIG.brand} — ${SITE_CONFIG.name}`,
            description,
          },
          {
            '@type': 'ProfilePage',
            '@id': `${origin}/#profilepage`,
            url: `${origin}/`,
            isPartOf: { '@id': `${origin}/#website` },
            mainEntity: {
              ...personSchema,
              address: {
                '@type': 'PostalAddress',
                streetAddress: SITE_CONFIG.location.street,
                addressLocality: 'Bangalore',
                addressRegion: 'Karnataka',
                postalCode: SITE_CONFIG.location.postalCode,
                addressCountry: 'IN',
              },
              knowsAbout: [
                'Search Engine Optimization',
                'International SEO',
                'Technical SEO',
                'Local SEO',
                'SaaS Marketing',
                'Answer Engine Optimization',
                'Generative Engine Optimization',
                'Online Reputation Management',
              ],
            },
          },
        ],
      });
    }
  }, [page, article]);
}
