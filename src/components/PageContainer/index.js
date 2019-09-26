import React, { useContext } from 'react';
import { AppContext } from './../../reducer';
import './style.less';

const PageContainer = (props) => {
  const { className } = props;
  const [state] = useContext(AppContext);
  const { playlist } = state;
  const paddingBottom = playlist.length ? '60px' : '0';
  return (
    <div className={className} style={{'paddingBottom': paddingBottom}}>
      {props.children}
    </div>
  )
}

export default React.memo(PageContainer);