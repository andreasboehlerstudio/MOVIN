import { useEffect, useMemo } from 'react';
import * as HelmetAsync from 'react-helmet-async';
import { useLocation } from 'react-router';

const helmetModule = HelmetAsync as any;
const helmetFallback = helmetModule["default"] || helmetModule["module.exports"];
const Helmet = helmetModule.Helmet || helmetFallback?.Helmet;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: any;
  preloadImage?: string;
  noindex?: boolean;
  appendSiteName?: boolean;
}

export default function SEO({ title, description, canonical, schema, preloadImage, noindex, appendSiteName = true }: SEOProps) {
  const siteName = "MOVIN Physiotherapie Freiburg";
  const fullTitle = appendSiteName ? `${title} | ${siteName}` : title;
  const location = useLocation();

  const baseUrl = "https://movin-freiburg.de";
  const shareImage = `${baseUrl}/og-image.jpg`;
  const normalizePath = (path: string) => {
    if (!path || path === "/") return "/";
    const cleanPath = path.split("?")[0].split("#")[0];
    return cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  };

  const currentUrl = useMemo(() => {
    if (canonical) return canonical;
    return `${baseUrl}${normalizePath(location.pathname)}`;
  }, [canonical, location.pathname]);

  useEffect(() => {
    const managedHeadElements = [
      { selector: 'title', value: fullTitle },
      { selector: 'meta[name="description"]', value: description },
      { selector: 'meta[property="og:title"]', value: fullTitle },
      { selector: 'meta[property="og:description"]', value: description },
      { selector: 'meta[property="og:type"]', value: 'website' },
      { selector: 'meta[property="og:image"]', value: shareImage },
      { selector: 'meta[property="og:image:secure_url"]', value: shareImage },
      { selector: 'meta[property="og:image:type"]', value: 'image/jpeg' },
      { selector: 'meta[property="og:image:width"]', value: '1200' },
      { selector: 'meta[property="og:image:height"]', value: '630' },
      { selector: 'meta[property="og:image:alt"]', value: 'MOVIN Physiotherapie innovativ bewegt' },
      { selector: 'meta[name="twitter:card"]', value: 'summary_large_image' },
      { selector: 'meta[name="twitter:title"]', value: fullTitle },
      { selector: 'meta[name="twitter:description"]', value: description },
      { selector: 'meta[name="twitter:image"]', value: shareImage },
    ];

    const removeFallbackDuplicates = () => {
      managedHeadElements.forEach(({ selector, value }) => {
        const elements = Array.from(document.head.querySelectorAll(selector));
        if (elements.length < 2) return;

        const matchingElements = elements.filter((element) => {
          if (element instanceof HTMLTitleElement) return element.textContent === value;
          return element.getAttribute('content') === value;
        });
        const elementToKeep = matchingElements.at(-1) ?? elements.at(-1);

        elements.forEach((element) => {
          if (element !== elementToKeep) element.remove();
        });
      });
    };

    removeFallbackDuplicates();
    const animationFrame = window.requestAnimationFrame(removeFallbackDuplicates);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [description, fullTitle, shareImage]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:secure_url" content={shareImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="MOVIN Physiotherapie innovativ bewegt" />
      
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />
      {preloadImage && <link rel="preload" as="image" href={preloadImage} />}

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
