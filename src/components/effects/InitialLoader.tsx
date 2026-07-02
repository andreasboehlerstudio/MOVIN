import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';

const LOGO_SVG = '/images/logos/movin-logo-2026-horizontal-1c-pos.svg';
const LOGO_VIEW_BOX = '0 0 613.165 258.109';
const INTRO_DELAY = 0.42;

type LogoPathGroup = 'claim' | 'symbolPerson' | 'symbolStreak' | 'word';

type LogoPath = {
  d: string;
  delay: number;
  group: LogoPathGroup;
  origin: string;
};

function getPathBox(d: string) {
  const values = d.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
  const points = [];

  for (let index = 0; index < values.length - 1; index += 2) {
    points.push({ x: values[index], y: values[index + 1] });
  }

  if (!points.length) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };
  }

  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  };
}

function getPathGroup(box: ReturnType<typeof getPathBox>): LogoPathGroup {
  if (box.maxX < 252) {
    const isLeftStreak = box.maxX < 150 || (box.minX < 125 && box.maxX < 210 && box.height < 115);
    return isLeftStreak ? 'symbolStreak' : 'symbolPerson';
  }
  if (box.maxY > 185) return 'claim';
  return 'word';
}

function extractLogoPaths(svgMarkup: string): LogoPath[] {
  const document = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
  const counters: Record<LogoPathGroup, number> = {
    claim: 0,
    symbolPerson: 0,
    symbolStreak: 0,
    word: 0
  };

  return Array.from(document.querySelectorAll('svg > path')).map((path) => {
    const d = path.getAttribute('d') ?? '';
    const box = getPathBox(d);
    const group = getPathGroup(box);
    const order = counters[group]++;
    const delay =
      group === 'symbolStreak'
        ? INTRO_DELAY + 0.04 + order * 0.14
        : group === 'symbolPerson'
          ? INTRO_DELAY + 0.92 + order * 0.02
          : group === 'word'
            ? INTRO_DELAY + 1.2 + order * 0.032
            : INTRO_DELAY + 1.56 + order * 0.016;

    return {
      d,
      delay,
      group,
      origin: `${box.minX + box.width / 2}px ${box.minY + box.height / 2}px`
    };
  });
}

function getPathInitial(group: LogoPathGroup) {
  if (group === 'symbolStreak') return { opacity: 0, rotate: -7, scale: 0.74, x: -14, y: 8 };
  if (group === 'symbolPerson') return { opacity: 0, rotate: -3, scale: 0.82, x: -4, y: 8 };
  if (group === 'claim') return { opacity: 0, rotate: 0, scale: 0.98, x: 0, y: 10 };
  return { opacity: 0, rotate: 0, scale: 0.94, x: 18, y: 2 };
}

function AnimatedMovinLogo({ paths }: { paths: LogoPath[] }) {
  if (!paths.length) {
    return (
      <motion.img
        src={LOGO_SVG}
        alt="MOVIN"
        className="h-full w-full object-contain drop-shadow-[0_16px_34px_rgba(10,15,77,0.24)]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: INTRO_DELAY + 0.2, ease: [0.76, 0, 0.24, 1] }}
      />
    );
  }

  return (
    <motion.svg
      viewBox={LOGO_VIEW_BOX}
      role="img"
      aria-label="MOVIN"
      className="h-full w-full overflow-visible drop-shadow-[0_16px_34px_rgba(10,15,77,0.24)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <defs>
        <linearGradient id="initial-loader-logo-fill" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="56%" stopColor="#ffffff" />
          <stop offset="78%" stopColor="#DDF4E2" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {paths.map((path, index) => (
        <motion.path
          key={`${path.group}-${index}`}
          d={path.d}
          fill="url(#initial-loader-logo-fill)"
          initial={getPathInitial(path.group)}
          animate={{ opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 }}
          transition={{
            duration: path.group === 'claim' ? 0.48 : path.group === 'word' ? 0.62 : 0.7,
            delay: path.delay,
            ease: [0.76, 0, 0.24, 1]
          }}
          style={{
            transformBox: 'view-box',
            transformOrigin: path.origin
          }}
        />
      ))}
    </motion.svg>
  );
}

export default function InitialLoader() {
  const location = useLocation();
  const [logoPaths, setLogoPaths] = useState<LogoPath[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(LOGO_SVG)
      .then((response) => response.text())
      .then((svgMarkup) => {
        if (isMounted) setLogoPaths(extractLogoPaths(svgMarkup));
      })
      .catch(() => {
        if (isMounted) setLogoPaths([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const isHome = location.pathname === '/';

    if (!isHome) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => setVisible(false), 3100);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.key]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000000] flex items-center justify-center overflow-hidden bg-white pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(135deg,#B4DFBB_0%,#00b2ba_100%)]"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="absolute inset-0"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.02, rotate: 0 }}
            animate={{ opacity: 0.45, scale: [1.02, 1.08, 1.02], rotate: [0, 1.2, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.16, ease: [0.76, 0, 0.24, 1] },
              scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              background:
                'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at 78% 74%, rgba(10,15,77,0.18) 0%, rgba(10,15,77,0) 40%)'
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 px-8"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.36, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative h-28 w-[360px] sm:h-36 sm:w-[520px]">
              <AnimatedMovinLogo paths={logoPaths} />
              <motion.div
                className="absolute inset-x-[14%] bottom-0 h-px bg-white/70"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 0.85, delay: INTRO_DELAY + 1.46, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden="true"
              />
            </div>

            <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/24">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '0%', '100%'] }}
                transition={{ duration: 1.45, delay: INTRO_DELAY + 0.18, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
