import React, { useState, useEffect, useRef, useContext } from 'react';
import { Loading, Toast, IconFont } from './../../components';
import API from './../../api';
import { AppContext } from './../../reducer';
import { getSongUserNames } from './../../utils';
import './style.less';

const RankDetail = (props) => {

  const [state, dispatch] = useContext(AppContext);

  const [id] = useState(props.match.params.id);
  const [playlist, setPlaylist] = useState([]);

  const headerEl = useRef(null);
  const titleEl = useRef(null);
  const playEl = useRef(null);

  useEffect(() => {
    const getPlaylist = async () => {
      Loading.show();
      try {
        const data = await API.playList(id);
        if (data.code === 200) {
          setPlaylist(data.playlist);
        }
      } catch(error) {
        console.log(error);
        Toast.error('获取榜单详情异常');
      }
      Loading.hide();
    }
    getPlaylist();
  }, [id]);

  useEffect(() => {

    const handleScroll = (event) => {
      const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
      const playElOffsetTop = playEl.current.offsetTop; // 播放全部按钮距离屏幕顶部距离
      if (scrollTop < playElOffsetTop) {
        headerEl.current.style.opacity = scrollTop / playElOffsetTop;
      } else if (scrollTop > playElOffsetTop) {
        headerEl.current.style.opacity = 1;
      }
  
      if (scrollTop > 100) {
        titleEl.current.style.opacity = 1;
      } else {
        titleEl.current.style.opacity = 0;
      }
      
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  const goBack = () => {
    props.history.goBack();
  }

  const addPlayList = (index = 0) => {
    dispatch({
      type: 'ADD_PLAY_LIST',
      payload: {
        playlist: playlist.tracks,
        playlistIds: playlist.trackIds,
        currentIndex: index
      }
    });
  }

  if (!playlist.tracks) return null;
  return (
    <div className="rank-detail-page">
      <div className="container">
        <div className="background">
          <img className="image" src={playlist.creator.backgroundUrl}/>
        </div>
        <div ref={headerEl} className="header opacity">
          <img className="image" src={playlist.creator.backgroundUrl}/>
        </div>
        <div className="header">
          <IconFont onClick={goBack} style={{padding: '15px'}} name="iconarrowleft" size="24" color="#fff"/>
          <p ref={titleEl} className="title">{playlist.name}</p>
        </div>
        <div className="content">
          <div className="left">
            <img src={playlist.coverImgUrl}/>
          </div>
          <div className="right">
            <p className="title">{playlist.name}</p>
            <p className="desc">{playlist.description}</p>
          </div>
        </div>
        <div className="footer">
          <FooterItem name="iconmessage" text={`${(playlist.commentCount/10000).toFixed(1)}万`} />
          <FooterItem name="iconshare" text={playlist.shareCount} />
          <FooterItem name="icondownload" text="下载" />
          <FooterItem name="iconellipsis" text="更多" />
        </div>
        <div ref={playEl} className="play-all">
          <div className="play" onClick={() => addPlayList()}>
            <IconFont name="iconplay-circle-fill" size="20" color="#666"/>
          </div>
          <p className="info" onClick={() => addPlayList()}>播放全部<span>(共{playlist.trackCount}首)</span></p>
        </div>
      </div>
      <div className="list">
        {
          playlist.tracks.map((item, index) => <ListItem key={item.id} index={index} data={item} onClick={() => addPlayList(index)} />)
        }
      </div>
    </div>
  )
}

const ListItem = (props) => {
  const { index, data, onClick } = props;
  
  return (
    <div onClick={onClick} className="item">
      <span className={`index ${index <= 2 ? 'top' : ''}`}>{index + 1}</span>
      <div className="info ellipsis">
        <p className="title ellipsis">{data.name}{data.alia && data.alia.length ? <span>（{data.alia[0]}）</span> : ''}</p>
        <p className="name ellipsis">{getSongUserNames(data.ar, data.al)}</p>
      </div>
    </div>
  )
}

const FooterItem = (props) => {
  const { name, size=24, color='#fff', text } = props;
  return (
    <div className="item">
      <IconFont name={name} size={size} color={color} />
      <span>{text}</span>
    </div>
  )
}

export default React.memo(RankDetail);