import { useEffect, useMemo, useState } from 'react';
import { Instagram, Loader2 } from 'lucide-react';

interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
}

const fallbackPosts: InstagramPost[] = [
  {
    id: 'fallback-lorettoberg',
    mediaUrl: '/images/standorte/lorettoberg/lorettoberg-gallery-1.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Einblicke in unsere Praxis am Lorettoberg.'
  },
  {
    id: 'fallback-mooswald',
    mediaUrl: '/images/standorte/mooswald/mooswald-main.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Moderne Therapie- und Trainingsflächen in Freiburg.'
  },
  {
    id: 'fallback-training',
    mediaUrl: '/images/standorte/mooswald/mooswald-gallery-3.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Aktives Training für nachhaltige Belastbarkeit.'
  },
  {
    id: 'fallback-sensopro',
    mediaUrl: '/images/training/sensopro-training.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Koordination, Stabilität und Bewegungssicherheit.'
  },
  {
    id: 'fallback-team',
    mediaUrl: '/images/standorte/lorettoberg/lorettoberg-gallery-6.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Therapie, Training und Teamarbeit bei MOVIN.'
  },
  {
    id: 'fallback-ki',
    mediaUrl: '/images/ki/ki-physiotherapie-symbolbild-nano-banana-2.webp',
    permalink: 'https://www.instagram.com/movinfreiburg/',
    caption: 'Digitale Begleitung mit Fokus Mensch.'
  }
];

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [usesFallback, setUsesFallback] = useState(false);

  const feedUrl = useMemo(() => {
    const configuredUrl = import.meta.env.VITE_INSTAGRAM_FEED_URL;
    return configuredUrl || 'https://feeds.behold.so/tVYCxTWzZ2N4U6ruECao';
  }, []);

  useEffect(() => {
    async function fetchInstagramPosts() {
      const isValidUrl =
        typeof feedUrl === 'string' &&
        feedUrl.startsWith('http') &&
        !feedUrl.includes('YOUR_') &&
        !feedUrl.includes('TODO');

      if (!isValidUrl) {
        setUsesFallback(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(feedUrl, {
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const fetchedPosts = Array.isArray(data) ? data : data.posts || [];

        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts.slice(0, 6));
          setUsesFallback(false);
        } else {
          setUsesFallback(true);
        }
      } catch (error) {
        console.warn('Instagram feed could not be loaded, using local MOVIN fallback posts.', error);
        setUsesFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [feedUrl]);

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl tracking-tight">
          Aktuelles aus der <span className="text-gradient-teal-mint">Praxis</span>
        </h2>
        <a
          href="https://www.instagram.com/movinfreiburg/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
        >
          <Instagram className="w-5 h-5" />
          @movinfreiburg
        </a>
      </div>

      {loading && feedUrl ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPosts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl bg-light"
              >
                <img
                  src={post.thumbnailUrl || post.mediaUrl}
                  alt={post.caption || 'MOVIN Instagram Einblick'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <Instagram className="text-white w-8 h-8 mb-3" />
                  {post.caption && (
                    <p className="text-white text-xs line-clamp-3 leading-relaxed">
                      {post.caption}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-dark/60 italic">
            {usesFallback
              ? 'Aktuelle Einblicke finden Sie direkt auf unserem Instagram-Kanal.'
              : 'Folgen Sie uns auf Instagram für tägliche Einblicke in unseren Praxisalltag, Übungstipps und Neuigkeiten.'}
          </p>
        </>
      )}
    </div>
  );
}
