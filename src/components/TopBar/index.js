import React from 'react';
import { IconFont } from './../../components';
import './style.less';

const TopBar = (props) => {
  return (
    <div className="topbar-component">
      <div className="menu">
        <IconFont name="iconmenu" size="24" color="#fff" />
      </div>
      <p className="title">标题栏</p>
      <div className="search">
        <IconFont name="iconsearch" size="24" color="#fff" />
      </div>
    </div>
  )
}

export default React.memo(TopBar);