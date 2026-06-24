import { useTranslation } from 'react-i18next';

import Button from './Button';
import LogoMark from './LogoMark';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="web-hero">
      <div className="web-hero-bg" />
      <div className="web-hero-inner">
        <div className="hero-copy">
          <span className="pill">
            <span className="tag">{t('hero.pillTag')}</span>{' '}
            {t('hero.pillText')}
          </span>
          <h1>
            {t('hero.headlinePre')}
            <em>{t('hero.headlineAccent')}</em>
          </h1>
          <p className="lede">{t('hero.lede')}</p>
          <div className="cta-row">
            <Button variant="primary">{t('actions.requestAccess')}</Button>
            <Button variant="ghost">{t('actions.readArchitecture')}</Button>
          </div>
        </div>

        <div className="hero-visual">
          <span className="label">{t('hero.visualLabel')}</span>
          <span className="corner-r">{t('hero.visualStatus')}</span>
          <LogoMark className="hero-mark" onInk strokeWidth={2.2} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
