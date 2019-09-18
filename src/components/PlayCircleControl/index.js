import React from 'react';
import ProgressCircle from './../ProgressCircle';
import IconFont from './../IconFont';

import './style.less';

const PlayCircleControl = (props) => {
  const { percent = 0, playing = false, onPlay = () => {}, onPause = () => {} } = props;

  // 播放
  const handlePlay = (e) => {
    onPlay();
  }

  // 暂停
  const handlePause = (e) => {
    onPause()
  }

  return (
    <div className="play-circle-control">
      <ProgressCircle radius={30} percent={percent} />
      { 
        playing 
        ? <div className="icon" onClick={handlePause}><IconFont name="iconpause" size={20} color="#d43c33" /></div> 
        : <div className="icon" onClick={handlePlay}><IconFont name="iconcaret-right" size={22} color="rgba(212, 68, 57, .5)" style={{marginLeft: '3px'}}/></div>
      }
    </div>
  )
}

export default React.memo(PlayCircleControl);