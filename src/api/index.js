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
  }
};

export default API;