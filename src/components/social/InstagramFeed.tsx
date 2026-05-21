import React, { useState, useEffect } from 'react';
import { Instagram, Loader2 } from 'lucide-react';

interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Der Feed-URL von deinem Behold.so Account
  const feedUrl = "https://feeds.behold.so/tVYCxTWzZ2N4U6ruECao";

  useEffect(() => {
    async function fetchInstagramPosts() {
      // Check if feedUrl is valid and not a placeholder
      const isValidUrl = feedUrl && 
                        feedUrl.startsWith('http') && 
                        !feedUrl.includes('YOUR_') && 
                        !feedUrl.includes('TODO');

      if (!isValidUrl) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(feedUrl, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Behold.so liefert ein Array von Posts direkt oder in einem 'posts' Feld
        const fetchedPosts = Array.isArray(data) ? data : data.posts || [];
        
        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts.slice(0, 6));
          setError(false);
        } else {
          // If no posts found, use fallback but don't show error
          setError(false);
        }
      } catch (err) {
        // Silent fail for network/CORS errors in dev, just use fallback
        console.warn('Instagram feed could not be loaded, using fallback posts.', err);
        setError(false); // Don't show red error message for network failures
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [feedUrl]);

  // Fallback-Daten, falls kein API-Key vorhanden ist oder ein Fehler auftritt
  const fallbackPosts: InstagramPost[] = [
    { id: '1', mediaUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Moderne Physiotherapie für Höchstleister.' },
    { id: '2', mediaUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Unser Team in Freiburg freut sich auf euch!' },
    { id: '3', mediaUrl: 'https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Individuelle Rehabilitation und Training.' },
    { id: '4', mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Aktives Training für nachhaltige Erfolge.' },
    { id: '5', mediaUrl: 'https://images.unsplash.com/photo-1600880210819-35b6c64446b1?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Neuigkeiten aus unseren Praxen.' },
    { id: '6', mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400', permalink: 'https://www.instagram.com/movinfreiburg/', caption: 'Gesundheit und Bewegung im Fokus.' },
  ];

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
                  alt={post.caption || "Instagram Post"} 
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
            Folge uns auf Instagram für tägliche Einblicke in unseren Praxisalltag, Übungstipps und Neuigkeiten.
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-500">
              Hinweis: Der Live-Feed konnte nicht geladen werden. Es werden Beispielbilder angezeigt.
            </p>
          )}
        </>
      )}
    </div>
  );
}
