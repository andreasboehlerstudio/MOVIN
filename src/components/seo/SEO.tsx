import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: any;
}

export default function SEO({ title, description, canonical, schema }: SEOProps) {
  const siteName = "MOVIN Physiotherapie Freiburg";
  const fullTitle = `${title} | ${siteName}`;
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseUrl = "https://movin-freiburg.de";
  const currentUrl = useMemo(() => {
    if (canonical) return canonical;
    return `${baseUrl}${location.pathname}${location.search}`;
  }, [canonical, location.pathname, location.search]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
