import React from 'react';
import './style.less';

function ProgressCircle(props) {
  const {radius, percent = 0} = props;
  //整个背景的周长
  const dashArray = Math.PI * 2 * 50;
  //没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;
  return (
    <svg width={radius} height={radius} viewBox="0 0 100 100">
      <circle className="progress-circle-background" cx="50" cy="50" r="50"/>
      <circle className="progress-circle-bar" cx="50" cy="50" r="50" strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
    </svg>
  );
}

export default React.memo(ProgressCircle);