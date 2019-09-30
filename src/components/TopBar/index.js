import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import IconFont from '../../components/IconFont';
import './style.less';

const TopBar = props => {
  return (
    <div className="topbar-component">
      <div className="menu">
        <IconFont name="iconmenu" size="24" color="#fff" />
      </div>
      <p className="title">标题栏</p>
      <div className="search">
        <IconFont
          name="iconsearch"
          size="24"
          color="#fff"
          onClick={() => props.history.push('/search')}
        />
      </div>
    </div>
  );
};

TopBar.prototype.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default React.memo(withRouter(TopBar));
