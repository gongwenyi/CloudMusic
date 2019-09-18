import React, { Fragment, useState, useEffect, useRef, createRef } from 'react';
import './style.less';
import API from './../../api';
import { Loading, Swiper, Toast, Alert } from '../../components';
import BScroll from 'better-scroll';

const Recommend = (props) => {

  const [banner, setBanner] = useState([]);
  const [bScroll, setBScroll] = useState(null);

  useEffect(() => {
    getBanner();

    if (!bScroll) {

      const wrapper = document.getElementById('wrapper');
      const scroll = new BScroll(wrapper);
      setBScroll(scroll);
      

      scroll.on('scroll', (pos) => {
        console.log('pos', pos)
      });
      scroll.on('touchEnd', (pos) => {
        //判断用户的下拉动作
        if(pos.y > 50) {
          console.log('下拉刷新')
        }
      });
      scroll.on('scrollEnd', () => {
        //判断是否滑动到了底部
        if(scroll.y <= scroll.maxScrollY + 100){
          console.log('上拉加载')
        }
      });
    }
  }, []);

  const getBanner = async () => {
    try {
      Loading.show();
      const data = await API.banner('banner');
      Loading.hide();
      setBanner(data.banners);
    } catch(error) {
      Toast.error('获取banner异常');
    }
  }

  return (
    <Fragment>
      <div className="recommend-page">
        <div id="wrapper" style={{height: '100%', overflow: 'hidden'}}>
          <div>
            {/* <Swiper containerStyle={{width: '100%', height: '1.4rem'}} imageStyle={{width: '100%',}} data={banner}/> */}
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Recommend;