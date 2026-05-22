import React from 'react';
import { GdprEmbed } from '../gdpr/GdprEmbed';

interface SpotifyPodcast {
  id: string;
  title: string;
  desc: string;
}

const podcasts: SpotifyPodcast[] = [
  { 
    id: '02OGD976cAFVdB1nCulcn4', // Kommt ein Arzt zum Physio
    title: 'Kommt ein Arzt zum Physio', 
    desc: 'Spannende Insights aus der Welt der Medizin und Therapie.' 
  },
  { 
    id: '7Hrnljg6l7gRpqXogrN9b7', // Ortho im Zentrum
    title: 'Ortho im Zentrum', 
    desc: 'Expertenwissen rund um Orthopädie und Gelenkgesundheit.' 
  },
  { 
    id: '3OXCeSAJWoZKjttbPH9IIW', // Process Physio - Next Level
    title: 'Process Physio Next Level', 
    desc: 'Für Therapeuten: Praxismanagement und Innovation.' 
  }
];

export const SpotifyEmbeds: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {podcasts.map((podcast) => (
        <div key={podcast.title} className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-secondary mb-2">{podcast.title}</h3>
          <GdprEmbed category="marketing" provider="Spotify">
            <iframe
              style={{ borderRadius: '12px', border: 'none' }}
              src={`https://open.spotify.com/embed/show/${podcast.id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </GdprEmbed>
          <p className="text-sm text-dark/70">{podcast.desc}</p>
        </div>
      ))}
    </div>
  );
};
