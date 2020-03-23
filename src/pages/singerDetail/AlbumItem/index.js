import React from 'react';
import './style.less';

const AlubmItem = props => {
  const { url, name, publishTime, size } = props;
  return (
    <div className="album-item-component">
      <img className="img" src={`${url}?param=100x100`} />
      <div className="info">
        <p className="name">{name}</p>
        <p className="desc">
          {publishTime} 歌曲{size}
        </p>
      </div>
    </div>
  );
};

export default React.memo(AlubmItem);
