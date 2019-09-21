import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PlayCircleControl, IconFont, PlayerPage, PlayerList } from './../../components';
import { AppContext } from './../../reducer';
import { getSongUserNames } from './../../utils';
import API from './../../api';
import './style.less';

const Player = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const {playlist, playlistIds, currentIndex} = state;  // 当前播放歌曲列表  当前播放歌曲id列表  当前播放歌曲下标
  const [showPlayer, setShowPlayer] = useState(false);  // 是否显示底部播放器
  const [currentId, setCurrentId] = useState(''); // 当前播放歌曲id
  const [url, setUrl] = useState(null); // 当前播放歌曲url
  const [playing, setPlaying] = useState(false);  // 播放、暂停状态
  const [percent, setPercent] = useState(0);  // 当前播放进度（0-1）
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [showPlayerPage, setShowPlayerPage] = useState(false);  // 是否显示播放器全屏界面
  const [showPlayerList, setShowPlayerList] = useState(false);  // 是否显示播放器全屏界面

  useEffect(() => {
    if (playlist.length) {
      setShowPlayer(true);
    }
  }, [playlist]);
  
  useEffect(() => {
    if (playlistIds.length) {
      setCurrentId(playlistIds[currentIndex].id);
    }
  }, [playlistIds, currentIndex]);

  useEffect(() => {
    const getSongUrl = async () => {
      const data = await API.songUrl(currentId);
      if (data.code === 200 && data.data && data.data.length) {
        setUrl(data.data[0].url);
        setPlaying(true);
        const timer = setInterval(() => {
          if (audioRef.current.readyState === 4) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            const percent = (currentTime / duration);
            setCurrentTime(currentTime);
            setDuration(duration);
            setPercent(percent);
            if (audioRef.current.ended) { // 当前歌曲播放结束
              clearInterval(timer);
              setPlaying(false);
              setPercent(0);
              setCurrentTime(0);
              setDuration(0);
              onPlayNext(); 
            }
          }
        }, 1000);
      }
    }
    if (currentId !== '') {
      getSongUrl();
    }
  }, [currentId]);

  // 暂停
  const onPause = () => {
    setPlaying(false);
    audioRef.current.pause();
  }

  // 播放
  const onPlay = () => {
    setPlaying(true);
    audioRef.current.play();
  }

  // 下一首
  const onPlayNext = () => {
    const index = currentIndex < playlistIds.length - 1 ? currentIndex + 1 : 0;
    dispatch({
      type: 'PLAY_NEXT',
      payload: {
        currentIndex: index
      }
    });
  }

  // 上一首
  const onPlayPrev = () => {
    const index = currentIndex === 0 ? playlistIds.length - 1 : currentIndex - 1;
    dispatch({
      type: 'PLAY_PREV',
      payload: {
        currentIndex: index
      }
    });
  }

  // 进度条拖动或点击可以快进
  const onPercentChange = (percent) => {
    audioRef.current.currentTime = percent * duration;
  }

  const onPlayIndex = (index) => {
    dispatch({
      type: 'PLAY_NEXT',
      payload: {
        currentIndex: index
      }
    });
  }

  if (!playlist.length) return null;
  return (
    <Fragment>
      <CSSTransition
        in={showPlayer}
        timeout={300}
        classNames="player-component"
        unmountOnExit
      >
        <div className="player-component">
          <audio ref={audioRef} className="audio" autoPlay src={url}/>
          <div className="left" onClick={() => setShowPlayerPage(true)}>
            <div className="avatar">
              <img src={`${playlist[currentIndex].al.picUrl}?param=100x100`}/>
            </div>
            <div className="info">
              <p className="song-name ellipsis">{playlist[currentIndex].name}</p>
              <p className="song-user ellipsis">{getSongUserNames(playlist[currentIndex].ar, playlist[currentIndex].al)}</p>
            </div>
          </div>
          <div className="right">
            <PlayCircleControl
              percent={percent}
              playing={playing}
              onPlay={onPlay}
              onPause={onPause}
            />
            <IconFont onClick={() => setShowPlayerList(true)} name="iconunorderedlist" size="26" color="#666" style={{marginLeft: '15px'}}/>
          </div>
        </div>
      </CSSTransition>
      {/* 播放器全屏界面 */}
      <PlayerPage
        show={showPlayerPage}
        playlist={playlist} 
        currentIndex={currentIndex}
        percent={percent}
        currentTime={currentTime}
        duration={duration}
        playing={playing}
        onHide={() => setShowPlayerPage(false)}
        onPercentChange={(percent) => onPercentChange(percent)}
        onPlayPrev={onPlayPrev}
        onPlayNext={onPlayNext}
        onPause={onPause}
        onPlay={onPlay}
        onShowPlayerList={() => setShowPlayerList(true)}
      />
      {/* 播放列表 */}
      <PlayerList
        show={showPlayerList}
        playlist={playlist}
        currentIndex={currentIndex}
        onPlayIndex={(index) => onPlayIndex(index)}
        onHide={() => setShowPlayerList(false)}
      />
    </Fragment>
  )
}

export default React.memo(Player);