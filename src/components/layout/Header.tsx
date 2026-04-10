import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Start', path: '/' },
    { 
      name: 'Leistungen', 
      path: '/leistungen',
      dropdown: [
        { name: 'Krankengymnastik', path: '/leistungen/krankengymnastik' },
        { name: 'Manuelle Therapie', path: '/leistungen/manuelle-therapie' },
        { name: 'Sportphysiotherapie', path: '/leistungen/sportphysiotherapie' },
        { name: 'Rücken-Therapie', path: '/leistungen/ruecken-therapie' },
        { name: 'Knie- & Schulter', path: '/leistungen/knie-schulter-therapie' },
        { name: 'Lymphdrainage', path: '/leistungen/lymphdrainage' },
        { name: 'Prävention', path: '/leistungen/praevention-gesundheitsfoerderung' },
      ]
    },
    { 
      name: 'Standorte', 
      path: '/standorte',
      dropdown: [
        { name: 'Lorettoberg', path: '/standorte/physiotherapie-freiburg-lorettoberg' },
        { name: 'Mooswald', path: '/standorte/physiotherapie-freiburg-mooswald' },
        { name: 'Europa-Park Rust', path: '/standorte/physiotherapie-europa-park-rust' },
      ]
    },
    { 
      name: 'Digital', 
      path: '/digital',
      dropdown: [
        { name: 'MOVIN App', path: '/digital/movin-app' },
        { name: 'KI-Physiotherapie', path: '/digital/ki-physiotherapie' },
        { name: 'KI Symptomcheck', path: '/digital/ki-symptomcheck' },
        { name: 'Anamnesebogen', path: '/digital/anamnesebogen' },
      ]
    },
    { name: 'Training', path: '/training' },
    { name: 'Über uns', path: '/ueber-uns' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <Logo className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.path}
                className={`flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors ${
                  location.pathname === link.path || location.pathname.startsWith(link.path) && link.path !== '/' 
                    ? 'text-primary' 
                    : 'text-secondary'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {/* Dropdown */}
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-56">
                  <div className="bg-white rounded-xl shadow-lg border border-border py-2 flex flex-col">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="px-4 py-2 text-sm text-dark hover:bg-light hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Link to="/termin" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#B4DFBB] to-[#00b2ba] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-md">
            <Calendar className="w-4 h-4" />
            Termin vereinbaren
          </Link>
          <button 
            className="lg:hidden p-2 text-secondary hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-border lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <Link 
                    to={link.path}
                    className="py-3 px-4 text-lg font-semibold text-secondary hover:text-primary hover:bg-light rounded-lg"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col pl-8 border-l-2 border-light ml-4 my-1 gap-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="py-2 text-sm text-dark hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 p-4 border-t border-border flex flex-col gap-4">
                <Link to="/termin" className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B4DFBB] to-[#00b2ba] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity w-full shadow-md">
                  <Calendar className="w-4 h-4" />
                  Termin vereinbaren
                </Link>
                <a href="tel:+497617073366" className="btn-outline w-full justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  +49 761 707 33 66
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
