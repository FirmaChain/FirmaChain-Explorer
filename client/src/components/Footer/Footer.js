import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {sns, snsLink, countryList, countryName} from '../../config';

import './Footer.scss';
import {GlobalActions} from "../../redux/actionCreators";


const imgChange = (targetSNS, on) => (e) => {
  e.currentTarget.src = `/image/icon/ico_${targetSNS}${on ? '_h' : ''}.svg`;
};

const changeLanguage = (lang) => {
  if (lang) {
    GlobalActions.changeLanguage(lang);
  }
};

const Footer = ({language, mode}) => (
  <div className={cx('footer', {mobile: mode >= 1})}>
    <div className="footerContent">
      <div className="footerLogo" onClick={() => {window.open('//firmachain.org')}}>
        <img src="/image/icon/logo_white.png" alt="footerLogo" />
      </div>
      <div className="footerRights">
        <p>info@firmachain.org</p>
      </div>
      <div className="footerLang">
        <div>
          Language
        </div>
        {
          countryList.map(lang => (
            <div key={lang} className={language === lang ? 'on' : ''} onClick={() => changeLanguage(lang)}>{countryName[lang]}</div>
          ))
        }
      </div>
      <div className="footerSNS">
        {
          sns.map((service) => {
            let snsRef = snsLink[service];
            return (
              <a
                href={snsRef}
                target="_blank"
                rel="noopener noreferrer"
                key={service}
              >
                <img
                  src={`/image/icon/ico_${service}.svg`}
                  alt="sns"
                  onMouseOver={imgChange(service, true)}
                  onFocus={imgChange(service, true)}
                  onMouseOut={imgChange(service, false)}
                  onBlur={imgChange(service, false)}
                />
              </a>
            );
          })
        }
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

export default Footer;
