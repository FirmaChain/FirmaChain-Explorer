import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {NavLink} from 'react-router-dom';

import CopyButton from '../CopyButton';
import MessageBox from '../MessageBox';

import {timeConverter, timezoneMatcher, titleConverter} from '../../lib';
import {detailWrapperConfig} from '../../config';

import BigNumber from "bignumber.js";

import './DetailWrapper.scss';

const DetailWrapperKey = ({titleList}) => (
  <div className="detailWrapperKey">
    {
      titleList.map(title => (
        <span key={title}>
          <FormattedMessage id={titleConverter(title)} />
        </span>
      ))
    }
  </div>
);

const ValueConverter = (title, value, linkList, copyList, lang, isMobile) => {
  if (title === 'url' && !value)
    return <FormattedMessage id="noUrl" />;

  for (let i = 0; i < linkList.length; i += 1) {
    if (linkList[i].indexOf(title) !== -1) {
      const linkTo = `/${lang}/${linkList[i].split('/')[0]}/${value}`;
      return (<React.Fragment>
        {
          title === 'url'
            ? (<a href={value}>{value}</a>)
            : (<NavLink to={linkTo}>{value}</NavLink>)
        }
        {
          (copyList.indexOf(title) !== -1 && value) &&
          <CopyButton value={value} />
        }
      </React.Fragment>);
    }
  }

  let content = '';
  switch (title) {
    case 'Time Stamp':
      content = <FormattedMessage {...timeConverter(value, true)} />; // timezoneMatcher(value);
      break;
    case 'Fee':
      if (!value) {
        content = '-'
        break;
      }

      let amount = ''
      let gasPrice = '';
      let gas = value.gas || 0;

      if (Array.isArray(value.amount) && value.amount.length > 0) {
        amount = new BigNumber(value.amount[0].amount).shiftedBy(-6).toFormat(3);
        gasPrice = new BigNumber(value.amount[0].amount).div(new BigNumber(value.gas)).toFixed(6);
      }

      content = `${amount} Firma / gas: ${gas}`;
      break;
    case 'Memo':
      if (!value)
        content = <div className="memo"><FormattedMessage id="noMemo" /></div>;

      content = value;
      break;
    case 'Details':
      if (!value)
        content = <FormattedMessage id="noDetails" />;

      content = value;
      break;
    case 'Message':
      if (!value) {
        content = <FormattedMessage id="noMessage" />;
        break;
      }

      content = <MessageBox msgs={value}
                            linkList={linkList}
                            copyList={copyList}
                            lang={lang}
                            title={title}
                            isMobile={isMobile} />;
      break;
    case 'Jailed':
      content = value === 'No' ?
        <div style={{color: '#389b52'}}><FormattedMessage id="statusActive" /></div> :
        <div style={{color: '#c8922e'}}><FormattedMessage id="statusJailed" /></div>;
      break;
    case 'Status':
      content = <div className={value.toLowerCase()}><FormattedMessage id={value.toLowerCase()} /></div>
      break;
    default:
      if (!value)
        value = '-';

      content = <React.Fragment>
        <div>{typeof value === 'object' ? JSON.stringify(value) : value}</div>
        {
          (copyList.indexOf(title) !== -1 && value) &&
          <CopyButton value={value} />
        }

      </React.Fragment>
      break;
  }

  return content;
}

const DetailWrapperValue = ({titleList, linkList, copyList, data, lang}) => (
  <div className="detailWrapperValue">
    {
      titleList.map((title) => {
        let content = ValueConverter(title, data[title], linkList, copyList, lang);

        return (
          <span key={title}>
              {
                content
              }
          </span>
        );
      })
    }
  </div>
);


const DetailWrapper = ({data, lang, mode, type}) => {

  const titleList = type ? detailWrapperConfig.titles[type] : [];
  const linkList = type ? detailWrapperConfig.linkTo[type] : [];
  const copyList = type ? detailWrapperConfig.copy[type] : [];

  data.Message = data.Messages;
  delete data.Messages;

  if (mode === 0) {
    return (
      <div className={cx('detailWrapper', {mobile: false})}>
        <DetailWrapperKey titleList={titleList} />
        <DetailWrapperValue titleList={titleList} linkList={linkList} copyList={copyList} data={data} lang={lang} />
      </div>
    );
  } else {
    return (
      <div className={cx('detailWrapper', {mobile: true})}>
        {
          titleList.map((title, i) => {
            let content = ValueConverter(title, data[title], linkList, copyList, lang, true);
            return (
              <div className="row" key={i}>
                <div className="title">
                  <FormattedMessage id={titleConverter(title)} />
                </div>
                <div className="content">{content}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
};

DetailWrapperKey.propTypes = {
  titleList: PropTypes.array.isRequired,
};

DetailWrapperValue.propTypes = {
  titleList: PropTypes.array.isRequired,
  linkList: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

DetailWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default DetailWrapper;
