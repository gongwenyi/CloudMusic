import React, { useState, useEffect } from 'react';
import BScroll from 'better-scroll';
import { CATEGORY, INITIAL } from './util';
import { Loading, Toast } from './../../components';
import API from './../../api';
import HorizontalScroll from './HorizontalScroll';
import './style.less';

const Singer = () => {

  const [categoryCode, setCategoryCode] = useState(CATEGORY[0].code);
  const [initialCode, setInitialCode] = useState('');
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const [bScroll, setBScroll] = useState(null);
  const [singerList, setSingerList] = useState([]);
  
  useEffect(() => {
    // BScroll需要在数据渲染完成后再初始化
    if (!bScroll && singerList.length) {
      const wrapper = document.getElementById('scroll-wrapper');
      const scroll = new BScroll(wrapper);
      setBScroll(scroll);
      scroll.on('touchEnd', (pos) => {
        //判断用户的下拉动作
        if(pos.y > 50) {
          setPage(0);
          setMore(true);
        }
      });

      scroll.on('scrollEnd', () => {
        //判断是否滑动到了底部
        if(scroll.y <= scroll.maxScrollY + 100){
          setPage(prevPage => prevPage + 1);
        }
      });
    }

    // 数据发生改变时，需要refresh，使用定时器延迟是保证数据渲染完成
    if(bScroll) {
      setTimeout(() => {
        bScroll.refresh();
      }, 40);
    }
  }, [singerList]);

  useEffect(() => {
    // 获取歌手列表
    const getSinger = async () => {
      Loading.show();
      try {
        const data = await API.singer(categoryCode, initialCode, page);
        if (data.code === 200) {
        
          setMore(data.more); // 是否还有更多数据

          if (page === 0) {
            setSingerList(data.artists);
            if (bScroll) {  // 滚动列表到顶部
              bScroll.scrollTo(0, 0);
            }
          } else {
            setSingerList(singerList.concat(data.artists));
          }
        }
      } catch(error) {
        console.log(error);
        Toast.error('获取歌手分类列表异常');
      }
      Loading.hide();
    }

    if (more) {
      getSinger();
    }
  }, [categoryCode, initialCode, page, more]);

  const handleCategoryClick = (code) => {
    setPage(0);
    setMore(true);
    setCategoryCode(code);
  }

  const handleInitialClick = (code) => {
    setPage(0);
    setMore(true);
    setInitialCode(code);
  }

  return (
    <div className="singer-page">
      <HorizontalScroll
        title="分类："
        data={CATEGORY}
        selected={categoryCode}
        onClick={(code) => handleCategoryClick(code)}
      />
      <HorizontalScroll
        title="首字母："
        data={INITIAL}
        selected={initialCode}
        onClick={(code) => handleInitialClick(code)}
      />
      <div id="scroll-wrapper">
        <div className="list">
          {
            singerList.map(item => (<div className="item" key={item.id}>
              <img className="avatar" src={`${item.picUrl}?param=200x200`} />
              <span className="name">{item.name}</span>
            </div>))
          }
          { !more && <div className="more">我是有底线的</div> }
        </div>
      </div>
    </div>
  )
}

export default Singer;