import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import './StubPage.css';

interface StubPageProps {
  /** i18n key under `nav.*` for the page title (e.g. "nav.docs"). */
  titleKey: string;
}

const StubPage = ({ titleKey }: StubPageProps) => {
  const { t, i18n } = useTranslation();
  const title = t(titleKey);

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
    document.title = `${title} — Workinabox`;
  }, [title, i18n.resolvedLanguage, i18n.language]);

  return (
    <>
      <Topbar />
      <main className="stub">
        <h1>{title}</h1>
        <p>{t('stub.comingSoon')}</p>
      </main>
      <Footer />
    </>
  );
};

export default StubPage;
