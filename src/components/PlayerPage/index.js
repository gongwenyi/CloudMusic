import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconFont, ProgressLine } from '..';
import { getSongUserNames, formatMinute } from '../../utils';
import './style.less';

const PlayerPage = (props) => {
  
  const {show, playlist, currentIndex, percent, currentTime, duration, playing, onHide, onPercentChange, onPlayPrev, onPlayNext, onPause, onPlay, onShowPlayerList  } = props;

  return (
      <CSSTransition
        in={show}
        timeout={300}
        classNames="player-page"
        unmountOnExit
      >
        <div className="player-page">
          <div className="background">
            <img src={`${playlist[currentIndex].al.picUrl}?param=100x100`}/>
          </div>
          <div className="close" onClick={onHide}>
            <IconFont name="icondown" size="26" color="#333"/>
          </div>
          <div className="header">
            <p className="song-name">{playlist[currentIndex].name}</p>
            <p className="song-user">{getSongUserNames(playlist[currentIndex].ar, playlist[currentIndex].al)}</p>
          </div>
          <div className="avatar">
            <img src={`${playlist[currentIndex].al.picUrl}?param=500x500`}/>
          </div>
          <div className="control">
            <div className="progress-bar">
              <span className="time">{formatMinute(currentTime)}</span>
              <div className="progress-line">
                <ProgressLine percent={percent} onPercentChange={(percent) => onPercentChange(percent)}/>
              </div>
              <span className="time">{formatMinute(duration)}</span>
            </div>
            <div className="control-bar">
              <IconFont name="iconsync" size="24" color="#fff" onClick={() => {}}/>
              <IconFont name="iconstep-backward" size="26" color="#fff" onClick={onPlayPrev}/>
              {
                playing ?
                <IconFont name="iconpoweroff-circle-fill" size="48" color="#fff" onClick={onPause}/> :
                <IconFont name="iconplay-circle-fill" size="48" color="#fff" onClick={onPlay}/>
              }
              <IconFont name="iconstep-forward" size="26" color="#fff" onClick={onPlayNext}/>
              <IconFont name="iconunorderedlist" size="24" color="#fff" onClick={onShowPlayerList}/>
            </div>
          </div>
        </div> 
      </CSSTransition>
  )
}

export default React.memo(PlayerPage);