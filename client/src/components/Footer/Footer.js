import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {  sns, snsLink } from '../../config';

import './Footer.scss';


const imgChange = (targetSNS, on) => (e) => {
  e.currentTarget.src = `/image/icon/ico-${targetSNS}-${on ? 'on' : 'off'}@3x.png`;
};

const Footer = ({ language, mode }) => (
  <div className={cx('footer', { mobile: mode === 2, tablet: mode >= 1 })}>
    <div className="footerContent">
      <div className="footerLogo">
        <img src="http://firmachain.org/static/logo.svg" alt="footerLogo" />
      </div>
      {
        mode === 0 && (
          <div className="footerRights">
            <p>©2018 MediBloc. All Rights Reserved.</p>
          </div>
        )
      }
      { mode === 0 && (
        <div className="footerPrivacyPolicy">
          Modified By FirmaChain.
        </div>
      )}
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
                  src={`/image/icon/ico-${service}-off@3x.png`}
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
    <div className="privacyPolicy">
    Modified By FirmaChain.
    </div>
  </div>
);

Footer.propTypes = {
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

export default Footer;
