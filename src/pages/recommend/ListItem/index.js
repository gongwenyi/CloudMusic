import React from 'react';
import './style.less';
import { IconFont } from '../../../components';

const ListItem = (props) => {
  const { data, onClick = () => {} } = props;
  return (
    <div onClick={onClick} className="sing-item-component">
      <div className="item-box">
        <img className="item-box-img" src={`${data.picUrl}?param=300x300`}/>
        <div className="play-count">
          <IconFont name="iconheadset" size="15" color="#fff" />
          <span className="count">{parseInt(data.playCount/10000)}万</span>
        </div>
      </div>
      <p className="item-name">{data.name}</p>
    </div>
  )
}

export default React.memo(ListItem);