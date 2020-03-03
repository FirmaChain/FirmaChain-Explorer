import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {NavLink} from 'react-router-dom';

import QrButton from '../QrButton';

import {timezoneMatcher, titleConverter} from '../../lib';
import {detailWrapperConfig} from '../../config';

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

const DetailWrapperValue = ({
                              titleList, linkList, data, lang,
                            }) => (
  <div className="detailWrapperValue">
    {
      titleList.map((title) => {
        for (let i = 0; i < linkList.length; i += 1) {
          if (linkList[i].indexOf(title) !== -1) {
            const linkTo = `/${lang}/${linkList[i].split('/')[0]}/${data[title]}`;

            return (
              <span key={title}>
                {
                  title === 'url'
                    ? (<a href={data[title]}>{data[title]}</a>)
                    : (<NavLink to={linkTo}>{data[title]}</NavLink>)
                }
                {/*{*/}
                {/*  (['From', 'To'].indexOf(title) !== -1 && data[title]) && (<QrButton modalData={data[title]} />)*/}
                {/*}*/}
              </span>
            );
          }
        }

        let classNames = {
          message: title === 'Message',
          success: title === 'Status' && data[title] === 'Success',
          failure: title === 'Status' && data[title] !== 'Success'
        }

        if (title === 'Status')
          classNames[data[title] === 'Success' ? 'success' : 'failure'] = true;

        return (
          <span key={title} className={cx(classNames)}>
            {
              title === 'Time Stamp'
                ? timezoneMatcher(data[title])
                : data[title]
            }
          </span>
        );
      })
    }
  </div>
);

const DetailWrapper = ({
                         data, lang, mode, type,
                       }) => {
  const titleList = type ? detailWrapperConfig.titles[type] : [];
  const linkList = type ? detailWrapperConfig.linkTo[type] : [];

  return (
    <div className={cx('detailWrapper', {mobile: mode === 2})}>
      <DetailWrapperKey titleList={titleList} />
      <DetailWrapperValue titleList={titleList} linkList={linkList} data={data} lang={lang} />
    </div>
  );
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
