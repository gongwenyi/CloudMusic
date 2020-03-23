import React from 'react';
import { withRouter } from 'react-router-dom';
import { getSongUserNames } from '../../utils';
import './style.less';

const MusicList = props => {
  const { data = [], showTop = true, onClick = () => {} } = props;

  return (
    <div className="music-list-component">
      {data.map((item, index) => (
        <ListItem
          key={item.id}
          index={index}
          data={item}
          showTop={showTop}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

const ListItem = props => {
  const { index, data, showTop, onClick } = props;

  return (
    <div onClick={onClick} className="item">
      <span className={`index ${showTop && index <= 2 ? 'top' : ''}`}>
        {index + 1}
      </span>
      <div className="info ellipsis">
        <p className="title ellipsis">
          {data.name}
          {data.alia && data.alia.length ? <span>（{data.alia[0]}）</span> : ''}
        </p>
        <p className="name ellipsis">{getSongUserNames(data.ar, data.al)}</p>
      </div>
    </div>
  );
};

export default React.memo(MusicList);
