import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowDown } from 'lucide-react';
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

const statements = [
  {
    eyebrow: 'Physiotherapie in Freiburg und Rust',
    title: 'Evidenzbasierte',
    accent: 'Physiotherapie.',
    text: 'Aktuelles Wissen, klinische Erfahrung und Ihre Ziele bilden die Grundlage unserer Therapie.',
  },
  {
    eyebrow: 'Individuelle Analyse',
    title: 'Präzise',
    accent: 'verstehen.',
    text: 'Wir betrachten Beschwerden, Belastbarkeit und persönliche Kontextfaktoren gemeinsam.',
  },
  {
    eyebrow: 'Aktive Therapie',
    title: 'Gezielt',
    accent: 'trainieren.',
    text: 'Belastung wird messbar, Training individuell und Fortschritt nachvollziehbar.',
  },
  {
    eyebrow: 'Nachhaltige Ergebnisse',
    title: 'Sicher zurück in',
    accent: 'Bewegung.',
    text: 'Für mehr Selbstständigkeit und Belastbarkeit in Alltag, Beruf und Sport.',
  },
];

const opacityRanges = [
  { input: [0, 0.02, 0.22, 0.25], output: [1, 1, 1, 0.35] },
  { input: [0.25, 0.28, 0.47, 0.5], output: [0.35, 1, 1, 0.35] },
  { input: [0.5, 0.53, 0.72, 0.75], output: [0.35, 1, 1, 0.35] },
  { input: [0.75, 0.78, 0.97, 1], output: [0.35, 1, 1, 1] },
];

type ScrollStatementProps = {
  index: number;
  progress: MotionValue<number>;
  active: boolean;
};

function ScrollStatement({ index, progress, active }: ScrollStatementProps) {
  const statement = statements[index];
  const range = opacityRanges[index];
  const opacity = useTransform(progress, range.input, range.output);
  const y = useTransform(progress, range.input, [26, 0, 0, -22]);
  const Heading = index === 0 ? 'h1' : 'h2';

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden={!active}
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-[visibility] duration-100 ${
        active ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      <div className="max-w-4xl">
        <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-mint md:text-base">
          {statement.eyebrow}
        </p>
        <Heading className="max-w-4xl text-4xl font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem]">
          <span className="block">{statement.title}</span>
          <span className="text-gradient-teal-mint block pb-[0.08em]">{statement.accent}</span>
        </Heading>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/88 md:text-xl lg:text-2xl">
          {statement.text}
        </p>

        {index === statements.length - 1 && (
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/standorte/"
              tabIndex={active ? 0 : -1}
              className="rounded-full bg-primary px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover"
            >
              Unsere Standorte
            </Link>
            <Link
              to="/leistungen/"
              tabIndex={active ? 0 : -1}
              className="rounded-full border border-white/55 bg-white/8 px-8 py-3.5 text-center text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Leistungen entdecken
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StaticEvidenceHero() {
  return (
    <section className="relative flex min-h-[620px] h-[88svh] items-center overflow-hidden bg-secondary text-white">
      <img
        src="/images/home/evidenz-physiotherapie-poster.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,64,0.94)_0%,rgba(7,12,64,0.72)_55%,rgba(7,12,64,0.3)_100%)]" />
      <div className="container-custom relative z-10 pt-24">
        <div className="max-w-4xl">
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-mint md:text-base">
            {statements[0].eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem]">
            <span className="block">{statements[0].title}</span>
            <span className="text-gradient-teal-mint block pb-[0.08em]">{statements[0].accent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/88 md:text-xl lg:text-2xl">
            {statements[0].text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to="/standorte/" className="rounded-full bg-primary px-8 py-3.5 text-center font-semibold text-white hover:bg-primary-hover">
              Unsere Standorte
            </Link>
            <Link to="/leistungen/" className="rounded-full border border-white/55 bg-white/8 px-8 py-3.5 text-center font-semibold text-white backdrop-blur-sm hover:bg-white/15">
              Leistungen entdecken
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EvidenceScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRequestRef = useRef<number | null>(null);
  const videoDurationRef = useRef(8.04);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 24,
    mass: 0.34,
    restDelta: 0.0005,
  });
  const videoScale = useTransform(smoothProgress, [0, 1], [1.04, 1]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.08, 0.72, 0.84], [0, 1, 1, 0]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = smoothProgress.on('change', (value) => {
      const nextIndex = Math.min(statements.length - 1, Math.floor(value * statements.length));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));

      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }

      frameRequestRef.current = requestAnimationFrame(() => {
        const video = videoRef.current;
        if (!video || video.readyState < 1) return;

        const targetTime = Math.min(videoDurationRef.current - 0.04, value * videoDurationRef.current);
        if (Math.abs(video.currentTime - targetTime) > 0.025) {
          video.currentTime = targetTime;
        }
      });
    });

    return () => {
      unsubscribe();
      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [smoothProgress, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <StaticEvidenceHero />;
  }

  return (
    <section ref={sectionRef} className="relative h-[370svh] bg-secondary md:h-[400vh]" aria-label="Evidenzbasierte Physiotherapie">
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden bg-secondary text-white">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 will-change-transform">
          <img
            src="/images/home/evidenz-physiotherapie-poster.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/images/home/evidenz-physiotherapie-poster.webp"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onLoadedMetadata={(event) => {
              videoDurationRef.current = event.currentTarget.duration || 8.04;
              event.currentTarget.currentTime = Math.max(0.01, scrollYProgress.get() * videoDurationRef.current);
            }}
          >
            <source src="/videos/home/evidenz-physiotherapie-scroll.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,64,0.97)_0%,rgba(7,12,64,0.88)_48%,rgba(7,12,64,0.42)_100%)] md:bg-[linear-gradient(90deg,rgba(7,12,64,0.94)_0%,rgba(7,12,64,0.76)_42%,rgba(7,12,64,0.12)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,12,64,0.48)_0%,transparent_36%,rgba(7,12,64,0.15)_100%)]" />

        <div className="container-custom relative z-10 h-full pt-24 md:pt-28">
          <div className="relative h-full max-w-5xl">
            {statements.map((_, index) => (
              <ScrollStatement key={index} index={index} progress={smoothProgress} active={activeIndex === index} />
            ))}
          </div>
        </div>

        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-9" aria-hidden="true">
          {statements.map((_, index) => (
            <span
              key={index}
              className={`block w-1 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'h-10 bg-mint' : 'h-5 bg-white/35'
              }`}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-white/80"
          aria-hidden="true"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
