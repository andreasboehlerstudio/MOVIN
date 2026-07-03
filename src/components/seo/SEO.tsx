import { useMemo } from 'react';
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
}

export default function SEO({ title, description, canonical, schema, preloadImage, noindex }: SEOProps) {
  const siteName = "MOVIN Physiotherapie Freiburg";
  const fullTitle = `${title} | ${siteName}`;
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
