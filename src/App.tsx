import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Home from './pages/Home';
import Product from './pages/Product';
import TheBox from './pages/TheBox';
import Docs from './pages/Docs';
import Pricing from './pages/Pricing';
import Company from './pages/Company';
import { isSupportedLanguage } from './i18n';

const LangGate = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  const isValid = !!lang && isSupportedLanguage(lang);

  useEffect(() => {
    if (isValid && lang && i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [isValid, lang, i18n]);

  if (!isValid) {
    return (
      <Navigate
        to={`/${i18n.resolvedLanguage ?? i18n.language ?? 'en'}/`}
        replace
      />
    );
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="product" element={<Product />} />
      <Route path="the-box" element={<TheBox />} />
      <Route path="docs" element={<Docs />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="company" element={<Company />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

const RootRedirect = () => {
  const { i18n } = useTranslation();
  return (
    <Navigate
      to={`/${i18n.resolvedLanguage ?? i18n.language ?? 'en'}/`}
      replace
    />
  );
};

const App = () => (
  <Routes>
    <Route path="/:lang/*" element={<LangGate />} />
    <Route path="*" element={<RootRedirect />} />
  </Routes>
);

export default App;
