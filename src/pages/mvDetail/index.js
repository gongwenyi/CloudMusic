import React, { useState, useRef, useEffect } from 'react';
import {
  PageContainer,
  Loading,
  Toast,
  IconFont,
  ProgressLine
} from '../../components';
import API from '../../api';
import './style.less';

const MvDetail = props => {
  const [id] = useState(props.match.params.id);

  const videoContainerEl = useRef(null);
  const videoEl = useRef(null);

  const [mvDetail, setMvDetail] = useState();
  const [brs, setBrs] = useState([]);
  const [currentBrs, setCurrentBrs] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showQualityList, setShowQualityList] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getMvDetail = async () => {
      Loading.show();
      try {
        const data = await API.getMvDetail(id);
        if (data.code === 200) {
          setMvDetail(data.data);
          setBrs(Object.keys(data.data.brs));
        }
      } catch (error) {
        console.log(error);
        Toast.error('获取mv信息异常');
      }
      Loading.hide();
    };
    getMvDetail();
  }, [id]);

  // 点击video显示控制栏
  const onVideoClick = () => {
    if (!showControls) {
      setShowControls(true);
    }
  };

  // 播放
  const onPlay = () => {
    // setPlaying(true);
    if (videoEl.current.paused || videoEl.current.ended) {
      videoEl.current.play();
    }
  };

  // 暂停
  const onPause = () => {
    // setPlaying(false);
    videoEl.current.pause();
  };

  // 进度条改变
  const onPercentChange = percent => {
    setPlaying(true);
    if (videoEl.current.paused || videoEl.current.ended) {
      videoEl.current.play();
    }
    videoEl.current.currentTime = percent * videoEl.current.duration;
  };

  // 视频播放时间更新事件
  const handleTimeUpdate = () => {
    const duration = videoEl.current.duration;
    const currentTime = videoEl.current.currentTime;
    const percent = currentTime / duration;
    setPercent(percent);
    if (videoEl.current.ended) {
      videoEl.current.currentTime = 0;
      videoEl.current.pause();
      setPlaying(false);
      setPercent(0);
    }
  };

  const toggleShowQuality = () => {
    setShowQualityList(!showQualityList);
  };

  // 全屏播放
  const onRequestFullscreen = () => {
    if (videoContainerEl.current.requestFullscreen) {
      setFullscreen(true);
      videoContainerEl.current.requestFullscreen();
    } else if (videoContainerEl.current.webkitRequestFullscreen) {
      setFullscreen(true);
      videoContainerEl.current.webkitRequestFullscreen();
    }
  };

  // 退出全屏
  const onExitFullscreen = () => {
    if (document.exitFullscreen) {
      setFullscreen(false);
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      setFullscreen(false);
      document.webkitCancelFullScreen();
    }
  };

  if (!mvDetail) return null;
  return (
    <PageContainer className="mv-detail-page">
      <div ref={videoContainerEl} className="video-container">
        <video
          ref={videoEl}
          className="video"
          autoPlay
          controls={false}
          src={mvDetail.brs[brs[currentBrs]]}
          onClick={onVideoClick}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className={`video-title ellipsis ${showControls ? 'show' : ''}`}>
          {mvDetail.name}
        </div>
        <div className={`video-controls ${showControls ? 'show' : ''}`}>
          <div className="play-btns">
            {playing ? (
              <IconFont
                name="iconpause"
                size="28"
                color="#fff"
                onClick={onPause}
              />
            ) : (
              <IconFont
                name="iconcaret-right"
                size="28"
                color="#fff"
                onClick={onPlay}
              />
            )}
          </div>
          <div className="progress-line">
            <ProgressLine
              percent={percent}
              onPercentChange={percent => onPercentChange(percent)}
            />
          </div>
          <div className="video-quality">
            <span className="quality-current" onClick={toggleShowQuality}>
              {brs[brs.length - 1]}P
            </span>
            <div className={`quality-list ${showQualityList ? 'show' : ''}`}>
              {brs.map((item, index) => (
                <span
                  key={item}
                  className={`item ${index === currentBrs ? 'active' : ''}`}
                >
                  {item}P
                </span>
              ))}
            </div>
          </div>
          <div className="full-screen-btns">
            {fullscreen ? (
              <IconFont
                name="iconshrink"
                size="26"
                color="#fff"
                onClick={onExitFullscreen}
              />
            ) : (
              <IconFont
                name="iconarrawsalt"
                size="26"
                color="#fff"
                onClick={onRequestFullscreen}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default React.memo(MvDetail);
