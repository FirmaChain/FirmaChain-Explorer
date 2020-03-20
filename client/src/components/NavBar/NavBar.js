import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import ScrollLock from 'react-scrolllock';

import Modal from '../Modal';
import NavList from './NavList';
import SearchBar from '../SearchBar';
import {GlobalActions} from '../../redux/actionCreators';
import {navBarPages, countryName, countryList} from '../../config';

import './NavBar.scss';

const changeLanguage = (lang) => {
  if (lang) {
    GlobalActions.changeLanguage(lang);
  }
};

const NavBarSideContent = ({currentUrl, lang}) => (
  <div className="navBarSide">
    <div className="navBarSideMenu">
      Menu
    </div>
    <div className="navBarSideNavList">
      <NavList pages={navBarPages} currentUrl={currentUrl} lang={lang} />
    </div>
    <div className="navBarSideMenu">
      Language
    </div>
    <div className="navBarSideNavList">
      {
        countryList.map((code) => (
          <div>
            <a href="javascript:void(0)" onClick={() => {
              changeLanguage(code)
            }}>
              {countryName[code]}
            </a>
          </div>
        ))
      }
    </div>
    <div className="navBarSideMenu">
      Related Links
    </div>
    <div className="navBarSideNavList">
      {
        countryList.map((code) => (
          <div>
            <a href="javascript:void(0)" onClick={() => {
              changeLanguage(code)
            }}>
              {countryName[code]}
            </a>
          </div>
        ))
      }
    </div>
  </div>
);

const noscroll = () => window.scrollTo(0, 0);

const NavBar = ({
                  currentUrl,
                  lang,
                  mode,
                  navBarOpen,
                }) => {
  if (navBarOpen) {
    //noscroll();
    window.addEventListener('scroll', noscroll);
  } else window.removeEventListener('scroll', noscroll);

  const {openNavBar, closeNavBar} = GlobalActions;

  return (
    <div className={cx('navBar', {mobile: mode >= 1, home: currentUrl === ''})}>
      <Modal />
      <div className="navBarContainer">
        {
          mode === 0 && (
            <div className="navBarLogo">
              <NavLink to={`/${lang}/`}>
                <img src="/image/icon/firmachain-tracker.svg" alt="TRACKER" />
              </NavLink>
            </div>
          )
        }
        {
          mode === 0 ? (
            <Fragment>
              <div className="navNavigator">
                <NavList pages={navBarPages} currentUrl={currentUrl} lang={lang} />
                <SearchBar className={cx({fullWidth: mode !== 0})} type="top" />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={"sidebar" + (navBarOpen ? ' opened' : '')}>
                <NavBarSideContent
                  navBarOpen={navBarOpen}
                  navBarPages={navBarPages}
                  currentUrl={currentUrl}
                  lang={lang}
                />
                <Fragment />
              </div>
            </Fragment>
          )
        }
        {
          mode !== 0 && (
            <Fragment>
              <div className="navBarLogo">
                <NavLink to={`/${lang}/`}>
                  <img src="/image/icon/firmachain-tracker.svg" alt="TRACKER" />
                </NavLink>
              </div>
              <button className="navBarOpener" type="button" onClick={navBarOpen ? closeNavBar : openNavBar}>
                {
                  navBarOpen ? (
                    // eslint-disable-next-line
                    <div className="opener opened" alt="opener">
                      <span />
                      <span />
                    </div>
                  ) : (
                    // eslint-disable-next-line
                    <div className="opener closed" alt="opener">
                      <span />
                      <span />
                    </div>
                  )
                }
              </button>
            </Fragment>
          )
        }
      </div>
      {
        mode !== 0 && (
          <SearchBar className={cx({fullWidth: mode !== 0})} type="top" />
        )
      }
    </div>
  );
};

NavBarSideContent.propTypes = {
  navBarOpen: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
};

NavBar.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  navBarOpen: PropTypes.bool.isRequired,
};

export default NavBar;
