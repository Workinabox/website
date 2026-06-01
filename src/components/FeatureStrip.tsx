import { useTranslation } from 'react-i18next';

import './FeatureStrip.css';

interface Feature {
  n: string;
  h: string;
  p: string;
}

const FeatureStrip = () => {
  const { t } = useTranslation();
  const features = t('features', { returnObjects: true }) as Feature[];

  return (
    <section className="web-strip">
      {features.map((f) => (
        <div key={f.n}>
          <div className="n">{f.n}</div>
          <div className="h">{f.h}</div>
          <div className="p">{f.p}</div>
        </div>
      ))}
    </section>
  );
};

export default FeatureStrip;
