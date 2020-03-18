import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { timeConverter, titleConverter } from '../../lib';
import { blindAddress } from '../../config';

import './ListWrapper.scss';
import {CopyToClipboard} from "react-copy-to-clipboard";

const CopyButton = (value) => {
  const [isCopied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false)
    }, 3000);
  };

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <div className={`copyButton${isCopied ? ' copied' : ''}`}></div>
    </CopyToClipboard>
  )
}

const linkDistributor = ({
  centerList,
  datum,
  lang,
  linkTo,
  rightList,
  copyList,
  spacing,
  titles,
}) => titles.map((title, i) => {
  let content = null;
  const className = cx({
    center: centerList.indexOf(title) !== -1 && rightList.indexOf(title) === -1,
    right: rightList.indexOf(title) !== -1,
  });
  const style = { width: `${spacing[i]}%` };

  linkTo.some((link) => {
    const separator = link.split('/');
    if (title.toLowerCase().indexOf(separator[1]) !== -1) {
      content = (
        <NavLink
          to={`/${lang}/${separator[0]}/${datum[title]}`}
          style={style}
          className={className}
          key={title}
        >
          {
            (title === 'To' && datum[title] === blindAddress) ? '-' : datum[title]
          }
        </NavLink>
      );
      return true;
    }
    return false;
  });

  if (!content) {
    const d = { ...datum, 'Time Stamp': datum['Time Stamp'] && timeConverter(datum['Time Stamp']) };
    content = (
      <span
        style={style}
        className={className}
        key={title}
      >
        {d[title]}
      </span>
    );
  }
  return <React.Fragment>
    {content}
    {(copyList.indexOf(title) !== -1) && CopyButton(datum[title])}
  </React.Fragment>;
});

const ListWrapperTitle = ({ titles, spacing, centerList }) => (
  <div className="listWrapperTitles">
    {
      titles.map((title, i) => (
        <span
          style={{ width: `${spacing[i]}%` }}
          className={cx({ center: centerList.indexOf(title) !== -1 })}
          key={title}
        >
          <FormattedMessage id={titleConverter(title)} />
        </span>
      ))
    }
  </div>
);

const ListWrapperContents = ({
  centerList, data, lang, linkTo, rightList, copyList, spacing, titles,
}) => {
  const className = (datum) => {
    if (datum.Ranking >= 1 && datum.Ranking <= 21) {
      return cx('listWrapperContentRow', 'special');
    }
    return cx('listWrapperContentRow');
  };

  return (
    <div className="listWrapperContents">
      {
        data.map((datum, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={className(datum)} key={i}>
            { linkDistributor({
              centerList, datum, lang, linkTo, rightList, copyList, spacing, titles,
            }) }
          </div>
        ))
      }
    </div>
  );
};

const ListWrapper = ({
  centerList,
  data,
  lang,
  linkTo,
  rightList,
  copyList,
  spacing,
  titles,
}) => (
  <div className="listWrapper">
    <ListWrapperTitle titles={titles} spacing={spacing} centerList={centerList} />
    <ListWrapperContents
      centerList={centerList}
      data={data}
      lang={lang}
      linkTo={linkTo}
      rightList={rightList}
      copyList={copyList}
      spacing={spacing}
      titles={titles}
    />
  </div>
);

ListWrapperTitle.propTypes = {
  titles: PropTypes.array.isRequired,
  spacing: PropTypes.array.isRequired,
  centerList: PropTypes.array.isRequired,
};

ListWrapperContents.propTypes = {
  centerList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  linkTo: PropTypes.array.isRequired,
  rightList: PropTypes.array.isRequired,
  copyList: PropTypes.array,
  spacing: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
};


ListWrapper.propTypes = {
  centerList: PropTypes.array,
  data: PropTypes.array.isRequired,
  linkTo: PropTypes.array,
  rightList: PropTypes.array,
  copyList: PropTypes.array,
  spacing: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
};

ListWrapper.defaultProps = {
  centerList: [],
  linkTo: [],
  rightList: [],
  copyList: []
};

export default ListWrapper;
