import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Topbar from '../components/Topbar';
import Hero from '../components/Hero';
import FeatureStrip from '../components/FeatureStrip';
import Footer from '../components/Footer';

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
  }, [t, i18n.resolvedLanguage, i18n.language]);

  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <FeatureStrip />
      </main>
      <Footer />
    </>
  );
};

export default Home;
