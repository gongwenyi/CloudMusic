import React from 'react';
import { IconFont } from '../../../components';
import './style.less';

const MvItem = props => {
  const { url, name, publishTime, playCount, onClick } = props;
  const count =
    playCount >= 10000
      ? parseInt(playCount / 10000)
      : parseFloat(playCount / 10000, 2);
  return (
    <div className="mv-item-component" onClick={onClick}>
      <div className="mv-box">
        <img className="img" src={`${url}?param=200x140`} />
        <div className="play-count">
          <IconFont name="iconplay-circle" size="14" color="#fff" />
          <span className="count">{count}万</span>
        </div>
      </div>
      <div className="info">
        <p className="name">{name}</p>
        <p className="desc">{publishTime}</p>
      </div>
    </div>
  );
};

export default React.memo(MvItem);
