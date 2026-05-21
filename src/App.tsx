import { Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LeistungenHub from './pages/LeistungenHub';
import LeistungDetail from './pages/LeistungDetail';
import StandortPage from './pages/StandortPage';
import StandorteHub from './pages/StandorteHub';
import UeberUns from './pages/UeberUns';
import Karriere from './pages/Karriere';
import Faq from './pages/Faq';
import Kontakt from './pages/Kontakt';
import Termin from './pages/Termin';
import DigitalApp from './pages/DigitalApp';
import DigitalKi from './pages/DigitalKi';
import DigitalHub from './pages/DigitalHub';
import Anamnesebogen from './pages/Anamnesebogen';
import Training from './pages/Training';
import StationaereVersorgung from './pages/StationaereVersorgung';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import GenericPage from './pages/GenericPage';
import { CookieProvider } from './components/gdpr/CookieContext';
import { CookieConsent } from './components/gdpr/CookieConsent';

export default function App() {
  return (
    <>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            {/* Leistungen */}
            <Route path="leistungen" element={<LeistungenHub />} />
            <Route path="leistungen/:slug" element={<LeistungDetail />} />
            
            {/* Standorte */}
            <Route path="standorte" element={<StandorteHub />} />
            <Route path="standorte/:slug" element={<StandortPage />} />
            
            {/* Digital */}
            <Route path="digital" element={<DigitalHub />} />
            <Route path="digital/movin-app" element={<DigitalApp />} />
            <Route path="digital/ki-physiotherapie" element={<DigitalKi />} />
            <Route path="digital/anamnesebogen" element={<Anamnesebogen />} />
            
            {/* Other Pages */}
            <Route path="training" element={<Training />} />
            <Route path="stationaere-versorgung" element={<StationaereVersorgung />} />
            <Route path="ueber-uns" element={<UeberUns />} />
            <Route path="karriere" element={<Karriere />} />
            <Route path="faq" element={<Faq />} />
            <Route path="kontakt" element={<Kontakt />} />
            <Route path="termin" element={<Termin />} />
            
            {/* Legal */}
            <Route path="impressum" element={<Impressum />} />
            <Route path="datenschutz" element={<Datenschutz />} />
            
            {/* Catch all */}
            <Route path="*" element={<GenericPage />} />
          </Route>
        </Routes>
    </>
  );
}



