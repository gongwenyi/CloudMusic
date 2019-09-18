import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.less';

const NavBar = (props) => {
  return (
    <div className="navbar-component">
      <NavLink
        to="/recommend"
        activeClassName="selected"
        className="item"
      >
        <span>推荐</span>
      </NavLink>
      <NavLink
        to="/singer"
        activeClassName="selected"
        className="item"
      >
        <span>歌手</span>
      </NavLink>
      <NavLink
        to="/rank"
        activeClassName="selected"
        className="item"
      >
        <span>排行榜</span>
      </NavLink>
    </div>
  )
}

export default React.memo(NavBar);