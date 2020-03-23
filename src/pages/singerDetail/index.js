import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  PageContainer,
  Loading,
  Toast,
  IconFont,
  MusicList
} from '../../components';
import AlbumItem from './AlbumItem';
import MvItem from './MvItem';
import API from '../../api';
import { fromatTime } from '../../utils';
import { AppContext } from '../../reducer';
import './style.less';

const singerDetail = props => {
  const [state, dispatch] = useContext(AppContext);

  const [id] = useState(props.match.params.id);
  const [artist, setArtist] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [albumCount, setAlbumCount] = useState();
  const [mvList, setMvList] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundEl = useRef(null);
  const titleEl = useRef(null);
  const tabbarEl = useRef(null);

  useEffect(() => {
    const getArtists = async () => {
      Loading.show();
      try {
        const data = await API.getArtists(id);
        if (data.code === 200) {
          setArtist(data.artist);
          setPlaylist(data.hotSongs);
        }
      } catch (error) {
        console.log(error);
        Toast.error('获取歌手信息异常');
      }
      Loading.hide();
    };
    const getArtistsAlbum = async () => {
      Loading.show();
      try {
        const data = await API.getArtistsAlbum(id);
        if (data.code === 200) {
          setAlbumList(data.hotAlbums);
          setAlbumCount(data.artist.albumSize);
        }
      } catch (error) {
        console.log(error);
        Toast.error('获取歌手信息异常');
      }
      Loading.hide();
    };
    const getArtistsMv = async () => {
      Loading.show();
      try {
        const data = await API.getArtistsMv(id);
        if (data.code === 200) {
          setMvList(data.mvs);
        }
      } catch (error) {
        console.log(error);
        Toast.error('获取歌手信息异常');
      }
      Loading.hide();
    };
    getArtists();
    getArtistsAlbum();
    getArtistsMv();
  }, [id]);

  useEffect(() => {
    const handleScroll = event => {
      const scrollTop =
        (event.srcElement
          ? event.srcElement.documentElement.scrollTop
          : false) ||
        window.pageYOffset ||
        (event.srcElement ? event.srcElement.body.scrollTop : 0);
      const tabbarElOffsetTop = tabbarEl.current.offsetTop; // 距离屏幕顶部距离
      if (scrollTop < tabbarElOffsetTop) {
        backgroundEl.current.style.opacity = scrollTop / tabbarElOffsetTop;
      } else if (scrollTop > tabbarElOffsetTop) {
        backgroundEl.current.style.opacity = 1;
      }

      if (scrollTop > 100) {
        titleEl.current.style.opacity = 1;
      } else {
        titleEl.current.style.opacity = 0;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goBack = () => {
    props.history.goBack();
  };

  const goSingerDesc = () => {
    props.history.push(`/singerDesc/${id}?name=${artist.name}`);
  };

  const handleTabClick = index => {
    if (currentIndex != index) {
      setCurrentIndex(index);
    }
  };

  const addPlaylist = (index = 0) => {
    const playlistIds = playlist.map(item => ({ id: item.id }));
    dispatch({
      type: 'ADD_PLAY_LIST',
      payload: {
        playlist: playlist,
        playlistIds: playlistIds,
        currentIndex: index
      }
    });
  };

  const handleMvClick = id => {
    props.history.push(`/mvDetail/${id}`);
  };

  if (!playlist.length) return null;
  return (
    <PageContainer className="singer-detail-page">
      <div className="container">
        <div className="background">
          <img className="image" src={`${artist.img1v1Url}?param=750x750`} />
        </div>
        <div ref={backgroundEl} className="background opacity" />
        <div className="header">
          <IconFont
            onClick={goBack}
            style={{ padding: '15px' }}
            name="iconarrowleft"
            size="24"
            color="#fff"
          />
          <p ref={titleEl} className="title">
            {artist.name}
          </p>
        </div>

        <div ref={tabbarEl} className="tabbar">
          <span
            className={`item ${currentIndex === 0 ? 'active' : ''}`}
            onClick={() => handleTabClick(0)}
          >
            主页
          </span>
          <span
            className={`item ${currentIndex === 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            歌曲
          </span>
          <span
            className={`item ${currentIndex === 2 ? 'active' : ''}`}
            onClick={() => handleTabClick(2)}
          >
            专辑{albumCount}
          </span>
          <span
            className={`item ${currentIndex === 3 ? 'active' : ''}`}
            onClick={() => handleTabClick(3)}
          >
            MV{mvList.length ? mvList.length : ''}
          </span>
        </div>
      </div>
      <div style={{ display: currentIndex === 0 ? 'block' : 'none' }}>
        <Title
          icon="iconplay-circle-fill"
          name={`播放热门${playlist.length}`}
          onclick={() => addPlaylist()}
        />
        <MusicList
          data={playlist.slice(0, 5)}
          showTop={false}
          onClick={index => addPlaylist(index)}
        />
        <More name="更多热歌" onClick={() => handleTabClick(1)} />
        <Title name="歌手简介" />
        <div className="singer-desc">{artist.briefDesc}</div>
        <More name="更多信息" onClick={goSingerDesc} />
      </div>
      <div style={{ display: currentIndex === 1 ? 'block' : 'none' }}>
        {/* <Title
          icon="iconplay-circle-fill"
          name={`收藏热门${playlist.length}`}
          onclick={() => addPlaylist()}
        /> */}
        <MusicList
          data={playlist}
          showTop={false}
          onClick={index => addPlaylist(index)}
        />
      </div>
      <div style={{ display: currentIndex === 2 ? 'block' : 'none' }}>
        {albumList.map(item => (
          <AlbumItem
            key={item.id}
            url={item.picUrl}
            name={item.name}
            publishTime={fromatTime(item.publishTime)}
            size={item.size}
          />
        ))}
      </div>
      <div style={{ display: currentIndex === 3 ? 'block' : 'none' }}>
        {mvList.map(item => (
          <MvItem
            key={item.id}
            url={item.imgurl}
            name={item.name}
            publishTime={item.publishTime}
            playCount={item.playCount}
            onClick={() => handleMvClick(item.id)}
          />
        ))}
      </div>
    </PageContainer>
  );
};

const Title = props => {
  const { icon, name, onClick = () => {} } = props;
  return (
    <div className="title-item" onClick={onclick}>
      {icon && <IconFont name={icon} size="22" color="#333" />}
      <p style={{ paddingLeft: icon ? 8 : 0 }}>{name}</p>
    </div>
  );
};

const More = props => {
  const { name = '查看更多', onClick } = props;
  return (
    <div className="more" onClick={onClick}>
      <p>{name}</p>
      <IconFont name="iconright" size="15" color="#999" />
    </div>
  );
};

export default React.memo(singerDetail);
