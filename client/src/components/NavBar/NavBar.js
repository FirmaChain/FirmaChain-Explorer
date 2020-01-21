import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import ScrollLock from 'react-scrolllock';

import Language from '../Language';
import LanguageBox from '../Language/LanguageBox';
import Modal from '../Modal';
import NavList from './NavList';
import SearchBar from '../SearchBar';
import { GlobalActions } from '../../redux/actionCreators';
import { navBarPages } from '../../config';

import './NavBar.scss';


const NavBarSideContent = ({
  navBarOpen, currentUrl, lang,
}) => (
  <div className={`navBarSide ${navBarOpen ? 'navBarOpen' : 'navBarClose'}`}>
    <div className="navBarSideMenu">
      <img src="/image/icon/ico-all-menu.svg" alt="menu" />
      Menu
    </div>
    <div className="navBarSideNavList">
      <NavList pages={navBarPages} currentUrl={currentUrl} lang={lang} />
    </div>
    <div className="navBarSideMenu">
      <img src="/image/icon/ico-language.svg" alt="language" />
      Language
    </div>
    <div className="navBarSideNavList">
      <LanguageBox />
    </div>
    <ScrollLock isActive={navBarOpen} />
  </div>
);

const noscroll = () => window.scrollTo(0, 0 );

const NavBar = ({
  currentUrl,
  lang,
  mode,
  navBarOpen,
}) => {
  if (navBarOpen) {
    noscroll();
    window.addEventListener('scroll', noscroll);
  } else window.removeEventListener('scroll', noscroll);

  const { openNavBar, closeNavBar } = GlobalActions;
  const sideNavBarStyle = opened => ({
    root: {
      top: mode === 2 ? 55 : 85,
      position: 'fixed',
      zIndex: opened ? 1 : -1,
    },
    sidebar: {
      backgroundColor: 'white',
    },
    overlay: {
      top: mode === 2 ? 55 : 85,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      transition: 'left .3s ease-out, right .3s ease-out',
    },
  });

  return (
    <div className={cx('navBar', { mobile: mode === 2, tablet: mode >= 1, home: currentUrl === '' })}>
      <Modal />
      <div className="navBarContainer">
        {
          mode === 0 && (
            <div className="navBarLogo">
              <NavLink to={`/${lang}/`}>
                <img src="/image/icon/white_logo.svg" alt="logo" />
              </NavLink>
            </div>
          )
        }
        {
          mode === 0 ? (
            <Fragment>
              <div className="navNavigator">
                <NavList pages={navBarPages} currentUrl={currentUrl} lang={lang} />
              </div>
              <SearchBar className={cx({ fullWidth: mode !== 0 })} type="top" />
              <Language />
            </Fragment>
          ) : (
            <Fragment>
              <button className="navBarOpener" type="button" onClick={navBarOpen ? closeNavBar : openNavBar}>
                {
                  navBarOpen ? (
                    // eslint-disable-next-line
                    <img src="/image/icon/ico-close.svg" alt="opener" />
                  ) : (
                    // eslint-disable-next-line
                    <img src="/image/icon/ico-hamberg.svg" alt="opener" />
                  )
                }
              </button>
              <Sidebar
                sidebar={(
                  <NavBarSideContent
                    navBarOpen={navBarOpen}
                    navBarPages={navBarPages}
                    currentUrl={currentUrl}
                    lang={lang}
                  />
                )}
                open={navBarOpen}
                onSetOpen={closeNavBar}
                styles={sideNavBarStyle(navBarOpen)}
              >
                <Fragment />
              </Sidebar>
            </Fragment>
          )
        }
        {
          mode !== 0 && (
            <Fragment>
              <div className="navBarLogo">
                <NavLink to={`/${lang}/`}>
                  <img src="/image/icon/white_logo.svg" alt="logo" />
                </NavLink>
              </div>
              <button
                type="button"
                className="searchBtn"
                onClick={() => GlobalActions.openModal({ modalType: 'Search' })}
              >
                <img src="/image/icon/ico-search-s-black.svg" alt="search" />
              </button>
            </Fragment>
          )
        }
      </div>
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
