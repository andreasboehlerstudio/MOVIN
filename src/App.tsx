import { Routes, Route } from 'react-router';
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
import GoogleStatistiken from './pages/GoogleStatistiken';
import GenericPage from './pages/GenericPage';
import { CookieConsent } from './components/gdpr/CookieConsent';
import CtaTransition from './components/effects/CtaTransition';
import InitialLoader from './components/effects/InitialLoader';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';

export default function App() {
  return (
    <>
      <InitialLoader />
      <GoogleAnalytics />
      <CtaTransition />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="leistungen" element={<LeistungenHub />} />
          <Route path="leistungen/:slug" element={<LeistungDetail />} />

          <Route path="standorte" element={<StandorteHub />} />
          <Route path="standorte/:slug" element={<StandortPage />} />

          <Route path="digital" element={<DigitalHub />} />
          <Route path="digital/movin-app" element={<DigitalApp />} />
          <Route path="digital/ki-physiotherapie" element={<DigitalKi />} />
          <Route path="digital/anamnesebogen" element={<Anamnesebogen />} />

          <Route path="training" element={<Training />} />
          <Route path="stationaere-versorgung" element={<StationaereVersorgung />} />
          <Route path="ueber-uns" element={<UeberUns />} />
          <Route path="karriere" element={<Karriere />} />
          <Route path="faq" element={<Faq />} />
          <Route path="kontakt" element={<Kontakt />} />
          <Route path="termin" element={<Termin />} />

          <Route path="impressum" element={<Impressum />} />
          <Route path="datenschutz" element={<Datenschutz />} />
          <Route path="intern/google-statistiken" element={<GoogleStatistiken />} />

          <Route path="*" element={<GenericPage />} />
        </Route>
      </Routes>
    </>
  );
}
