import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoMark from './LogoMark';
import './Brand.css';

const Brand = () => {
  const { i18n } = useTranslation();
  return (
    <Link
      className="brand-lockup"
      to={`/${i18n.language}/`}
      aria-label="Workinabox — home"
    >
      <LogoMark size={26} onInk strokeWidth={13} />
      <span className="lwm">
        Workin<span className="a">a</span>box
      </span>
    </Link>
  );
};

export default Brand;
