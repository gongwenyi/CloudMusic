import React, { useEffect, useState, useRef } from 'react';
import './style.less';

function ProgressLine(props) {
  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();

  const [touch, setTouch] = useState();

  const progressBtnWidth = 30;

  const { percent, onPercentChange } = props;

  useEffect(() => {
    if (percent >= 0 && percent <= 1) {
      const barWidth = progressBar.current.clientWidth;
      const offsetWidth = percent * barWidth;
      _setStyle(offsetWidth);
    }
  }, [percent])

  // 设置进度条和指示点样式
  const _setStyle = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;  // 进度条宽度
    progressBtn.current.style.left =  `${offsetWidth - progressBtnWidth / 2}px`;  // 指示点位置
  }

  // 更新当前进度
  const _setPercent = () => {
    const progressBarWidth = progressBar.current.clientWidth; // 进度条总宽度
    const progresswidth = progress.current.clientWidth; // 当前进度
    const currentPrecent = progresswidth / progressBarWidth;
    onPercentChange(currentPrecent)
  }

  // 进度条点击事件
  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect();
    // e.pageX 鼠标距离屏幕左边的距离
    // rect.left 进度条容器距离屏幕左边的距离
    const offsetWidth = e.pageX - rect.left;
    _setStyle(offsetWidth);
    _setPercent();
  }
  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  }
  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const progressBarWidth = progressBar.current.clientWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), progressBarWidth);
    _setStyle(offsetWidth);
  }
  const progressTouchEnd = (e) => {
    const endTouch = {};
    endTouch.initiated = false;
    setTouch(endTouch);
    _setPercent();
  }

  return (
    <div 
      className="progress-line-component"
      ref={progressBar} 
      onClick={progressClick}
    >
      <div className="progress" ref={progress} />
      <div 
        className="progress-btn-wrapper"
        ref={progressBtn}
        onTouchStart={progressTouchStart}
        onTouchMove={progressTouchMove}
        onTouchEnd={progressTouchEnd}
      >
        <div className="progress-btn" />
      </div>
    </div>
  )
}

export default React.memo(ProgressLine);