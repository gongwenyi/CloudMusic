import React, { useState, useEffect, useRef, createRef } from 'react';
import './style.less';
import API from './../../api';
import { Loading, Swiper, Toast } from '../../components';
import ListItem from './ListItem';


const Recommend = (props) => {

  const [banner, setBanner] = useState([]);
  const [personalized, setPersonalized] = useState([]);

  useEffect(() => {
    getBanner();
    getPersonalized();
  }, []);

  const getBanner = async () => {
    Loading.show();
    try {
      const data = await API.banner();
      if (data.code === 200) {
        setBanner(data.banners);
      }
    } catch(error) {
      console.log(error);
      Toast.error('获取banner异常');
    }
    Loading.hide();
  }

  const getPersonalized = async () => {
    Loading.show();
    try {
      const data = await API.personalized();
      if (data.code === 200) {
        setPersonalized(data.result);
      }
    } catch(error) {
      console.log(error);
      Toast.error('获取推荐歌单异常');
    }
    Loading.hide();
  }

  return (
    <div className="recommend-page">
      <Swiper containerStyle={{width: '100%', height: '1.4rem'}} imageStyle={{width: '100%',}} data={banner}/>
      {
        !!personalized.length && <p className="sing-list-title">推荐歌单</p>
      }
      <div className="sing-list">
        {
          personalized.map(item => (<ListItem key={item.id} data={item} onClick={() => props.history.push(`/rank/${item.id}`)} />))
        }
      </div>
    </div>
  )
}

export default Recommend;