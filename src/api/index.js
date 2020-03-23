import axios from './axios';

const API = {
  // banner
  banner() {
    return axios.get('banner');
  },
  // 推荐歌单
  personalized() {
    return axios.get('personalized');
  },
  // 歌手分类列表
  singer(cat, initial = '', page = 0, limit = 30) {
    return axios.get('artist/list', {
      cat,
      initial,
      offset: page * limit,
      limit
    });
  },
  // 排行榜
  toplist() {
    return axios.get('toplist/detail');
  },
  // 榜单详情
  playList(id) {
    return axios.get('playlist/detail', {
      id
    });
  },
  // 获取歌曲url
  songUrl(id) {
    return axios.get('song/url', {
      id
    });
  },
  // 获取歌词
  getLyric(id) {
    return axios.get('lyric', {
      id
    });
  },
  // 获取歌手信息+热门歌曲
  getArtists(id) {
    return axios.get('artists', {
      id
    });
  },
  // 获取歌手描述
  getArtistsDesc(id) {
    return axios.get('artist/desc', {
      id
    });
  },
  // 获取歌手专辑
  getArtistsAlbum(id, limit = 60) {
    return axios.get('artist/album', {
      id,
      limit
    });
  },
  // 获取歌手mv
  getArtistsMv(id) {
    return axios.get('artist/mv', {
      id
    });
  },
  // 获取mv播放地址
  getMvDetail(mvid) {
    return axios.get('mv/detail', {
      mvid
    });
  }
};

export default API;
