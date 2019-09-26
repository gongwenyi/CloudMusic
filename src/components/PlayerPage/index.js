import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconFont, ProgressLine } from '..';
import { getSongUserNames, formatMinute } from '../../utils';
import './style.less';

const PlayerPage = (props) => {
  const {show, playlist, lyric, currentIndex, percent, currentTime, duration, playing, onHide, onPercentChange, onPlayPrev, onPlayNext, onPause, onPlay, onShowPlayerList  } = props;
  const [showLyric, setShowLyric] = useState(false);
  const lyricRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);

  const renderLyric = (lyric) => {
    return lyric.map((item, index) => {
      if (item.time && item.text) {
        return (<p className={`line ${currentLine === index ? 'active' : ''}`} key={item.time}>{item.text}</p>)
      }
      return null;
    });
  }

  useEffect(() => {
    if (lyric && lyric.length && lyricRef.current) {
      for (let i=0; i<lyric.length; i++) {
        if (i < lyric.length - 1 && lyric[i].time < currentTime && currentTime < lyric[i+1].time) {
          setCurrentLine(i);
          if (i > 3) {
            lyricRef.current.scrollTop = (i - 3) * 40;
          } else {
            lyricRef.current.scrollTop = 0;
          }
          return;
        }
      }
    }
  }, [currentTime]);
  
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
          <p className="song-name ellipsis">{playlist[currentIndex].name}</p>
          <p className="song-user ellipsis">{getSongUserNames(playlist[currentIndex].ar, playlist[currentIndex].al)}</p>
        </div>
        <div className="content">
          <div className="avatar" style={{'visibility': !showLyric ? 'visible' : 'hidden'}} onClick={() => setShowLyric(true)}>
            <img src={`${playlist[currentIndex].al.picUrl}?param=500x500`}/>
          </div>
          <div ref={lyricRef} className="lyric" style={{'visibility': showLyric ? 'visible' : 'hidden'}} onClick={() => setShowLyric(false)}>
            {renderLyric(lyric)}
          </div>
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