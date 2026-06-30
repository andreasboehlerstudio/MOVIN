import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

type TransitionState = 'IDLE' | 'ENTERING' | 'COVERED' | 'EXITING';

export default function CtaTransition() {
  const [state, setState] = useState<TransitionState>('IDLE');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const activeUrlRef = useRef<string>(location.pathname);

  useEffect(() => {
    activeUrlRef.current = location.pathname;
  }, [location]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (state !== 'IDLE') return;
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

      const target = event.target as HTMLElement;
      if (!target) return;

      // Find the closest anchor tag
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.origin !== window.location.origin) return;

      const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
      const isStaticAsset = /\.(pdf|jpg|jpeg|png|webp|gif|svg|mp4|webm|zip)$/i.test(targetUrl.pathname);
      if (isStaticAsset) return;

      const isHashOnlyNavigation = targetUrl.pathname === window.location.pathname && targetUrl.hash;
      if (isHashOnlyNavigation) return;

      // Prevent default browser/router navigation
      event.preventDefault();
      event.stopPropagation();

      // Check if we are already on the target URL
      const cleanHref = targetUrl.pathname.replace(/\/+$/, '') || '/';
      const cleanCurrent = activeUrlRef.current.replace(/\/+$/, '') || '/';
      if (cleanHref === cleanCurrent && !targetUrl.search && !targetUrl.hash) {
        // Just scroll to top if already there
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Start full page transition!
      setTargetUrl(targetPath);
      setState('ENTERING');
    };

    // Use capture phase to intercept prior to React Router's click handler
    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [state]);

  // Handle mid-point transitions
  useEffect(() => {
    if (state === 'ENTERING') {
      // Enter animation duration is 0.6s
      const timer = setTimeout(() => {
        setState('COVERED');
        navigate(targetUrl);
        // Ensure scrolling to top
        window.scrollTo(0, 0);
      }, 650);
      return () => clearTimeout(timer);
    } else if (state === 'COVERED') {
      // Small buffer to allow react to render, then exit
      const timer = setTimeout(() => {
        setState('EXITING');
      }, 50);
      return () => clearTimeout(timer);
    } else if (state === 'EXITING') {
      // Exit animation duration is 0.6s
      const timer = setTimeout(() => {
        setState('IDLE');
        setTargetUrl('');
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [state, targetUrl, navigate]);

  if (state === 'IDLE') return null;

  // Fluid SVG path morphing
  // Enter curve: sweeping from bottom (100) to top (0), bulging upwards in the center
  const enterPathInitial = "M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z";
  const enterPathTarget = "M 0 100 Q 50 100 100 100 L 100 0 Q 50 -25 0 0 Z";
  
  // Exit curve: pulling bottom up to reveal the content
  const exitPathInitial = "M 0 100 Q 50 100 100 100 L 100 0 Q 50 0 0 0 Z";
  const exitPathTarget = "M 0 0 Q 50 -25 100 0 L 100 0 Q 50 0 0 0 Z";

  // Dynamic cubic-bezier easing
  const fluidTransition = {
    duration: 0.65,
    ease: [0.76, 0, 0.24, 1] as const // Custom organic cubic bezier easing
  };

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[999999]">
      {/* Background overlay blocks interaction during transition */}
      <div className="absolute inset-0 pointer-events-auto" />

      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Header-inspired Mint-to-Teal Gradient */}
          <linearGradient id="cta-transition-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B4DFBB" />
            <stop offset="100%" stopColor="#00b2ba" />
          </linearGradient>
          <linearGradient id="cta-transition-grad-bg" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8ce09e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#008a91" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Dynamic transition paths */}
        <AnimatePresence mode="wait">
          {state === 'ENTERING' && (
            <g key="entering-group">
              {/* Backing staggered Layer */}
              <motion.path
                initial={{ d: enterPathInitial }}
                animate={{ d: enterPathTarget }}
                transition={{ ...fluidTransition, delay: 0.05 }}
                fill="url(#cta-transition-grad-bg)"
              />
              {/* Main beautiful colored Layer */}
              <motion.path
                initial={{ d: enterPathInitial }}
                animate={{ d: enterPathTarget }}
                transition={fluidTransition}
                fill="url(#cta-transition-grad)"
              />
            </g>
          )}

          {(state === 'COVERED' || state === 'EXITING') && (
            <g key="exiting-group">
              {/* Backing staggered Layer */}
              <motion.path
                initial={{ d: exitPathInitial }}
                animate={{ d: exitPathTarget }}
                transition={{ ...fluidTransition, delay: 0.05 }}
                fill="url(#cta-transition-grad-bg)"
              />
              {/* Main beautiful colored Layer */}
              <motion.path
                initial={{ d: exitPathInitial }}
                animate={{ d: exitPathTarget }}
                transition={fluidTransition}
                fill="url(#cta-transition-grad)"
              />
            </g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
