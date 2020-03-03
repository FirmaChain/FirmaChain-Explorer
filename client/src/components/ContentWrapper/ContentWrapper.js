import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './ContentWrapper.scss';


const titleConverter = (title) => {
  let convertedTitle = title.split(' ')[0].toLowerCase();
  if (title.split(' ')[1]) convertedTitle += title.split(' ')[1];
  return convertedTitle;
};

const ContentWrapperTitle = ({ mode, titles }) => (
  <div className={cx('contentWrapperInfoTitle', { mobile: mode === 2 })}>
    {
      titles.map(title => (
        <span key={title}>
          <FormattedMessage id={titleConverter(title)} />
        </span>
      ))
    }
  </div>
);

const ContentWrapperContent = ({ titles, data }) => (
  <div className="contentWrapperInfoContent">
    {
      titles.map(title => (
        <span className={title === 'Time Stamp' ? 'special' : null} key={title}>
          {data[title]}
        </span>
      ))
    }
  </div>
);

const ContentWrapper = ({
  lang, mode, type, data, titles,
}) => {
  const { 'Block Height': height } = data;

  let hash = '';
  titles.forEach((title) => {
    const ti = title.toLowerCase();
    if (ti.indexOf('hash') !== -1) hash = data[title];
    if (ti.indexOf('number') !== -1) hash = data[title];
    if (ti.indexOf('account') !== -1) hash = data[title];
  });
  const url = `/${lang}/${type}/${hash}`;

  const isTopRanker = data.Ranking >= 1 && data.Ranking <= 21;

  return (
    <NavLink to={url} className={cx('contentWrapperLinker', { special: isTopRanker, mobile: mode === 2 })}>
      <div className="contentWrapper">
        <ContentWrapperTitle mode={mode} titles={titles} />
        <ContentWrapperContent titles={titles} data={data} />
      </div>
    </NavLink>
  );
};

ContentWrapperTitle.propTypes = {
  mode: PropTypes.number.isRequired,
  titles: PropTypes.array.isRequired,
};

ContentWrapperContent.propTypes = {
  titles: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

ContentWrapper.propTypes = {
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
};

export default ContentWrapper;
