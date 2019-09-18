import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { PlayCircleControl, IconFont } from './../../components';
import { AppContext } from './../../reducer';
import { getSongUserNames } from './../../utils';
import API from './../../api';
import './style.less';

const Player = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const {playlist, playlistIds, currentIndex} = state;  // 当前播放歌曲列表  当前播放歌曲id列表  当前播放歌曲下标
  const [showPlay, setShowPlay] = useState(false);  // 是否显示底部播放器
  const [currentId, setCurrentId] = useState(''); // 当前播放歌曲id
  const [url, setUrl] = useState(null); // 当前播放歌曲url
  const [playing, setPlaying] = useState(false);  // 播放、暂停状态
  const [percent, setPercent] = useState(0);  // 当前播放进度（0-1）
  const audioRef = useRef(null);
  const [showPlayerPage, setShowPlayerPage] = useState(false);

  useEffect(() => {
    if (playlist.length) {
      setShowPlay(true);
      setCurrentId(playlistIds[currentIndex].id);
    }
  }, [playlist, playlistIds, currentIndex]);

  useEffect(() => {
    const getSongUrl = async () => {
      const data = await API.songUrl(currentId);
      if (data.code === 200 && data.data) {
        setUrl(data.data[0].url);
        setPlaying(true);
        const timer = setInterval(() => {
          if (audioRef.current.readyState === 4) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            const percent = (currentTime / duration);
            setPercent(percent);
            if (audioRef.current.ended) {
              clearInterval(timer);
              setPlaying(false);
              setPercent(0);
              dispatch({
                type: 'PLAY_NEXT',
                payload: {
                  currentIndex: currentIndex + 1
                }
              })
            }
          }
        }, 1000);
      }
    }
    getSongUrl();
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

  if (!showPlay) return null;
  return (
    <Fragment>
      <div className="player-component">
        <audio ref={audioRef} className="audio" autoPlay src={url}/>
        <div className="left" onClick={() => setShowPlayerPage(true)}>
          <div className="avatar">
            <img src={`${playlist[currentIndex].al.picUrl}?param=100x100`}/>
          </div>
          <div>
            <p className="song-name">{playlist[currentIndex].name}</p>
            <p className="song-user">{getSongUserNames(playlist[currentIndex].ar, playlist[currentIndex].al)}</p>
          </div>
        </div>
        <div className="right">
          <PlayCircleControl
            percent={percent}
            playing={playing}
            onPlay={onPlay}
            onPause={onPause}
          />
          <IconFont name="iconunorderedlist" size="26" color="#666" style={{marginLeft: '15px'}}/>
        </div>
      </div>
      {
        !!showPlayerPage &&
        <div className="player-page">
          <div className="background">
            <img src={`${playlist[currentIndex].al.picUrl}?param=500x500`}/>
          </div>
          <div className="close" onClick={() => setShowPlayerPage(false)}>
            <IconFont name="icondown" size="26" color="#333"/>
          </div>
          <div className="header">
            <p className="song-name">{playlist[currentIndex].name}</p>
            <p className="song-user">{getSongUserNames(playlist[currentIndex].ar, playlist[currentIndex].al)}</p>
          </div>
          <div className="avatar">
            <img src={`${playlist[currentIndex].al.picUrl}?param=500x500`}/>
          </div>
        </div> 
      }
    </Fragment>
  )
}

export default React.memo(Player);