import React, { useState, useEffect } from 'react';
import { Loading, Toast } from './../../components';
import API from './../../api';
import './style.less';

const Rank = (props) => {
  const [toplist, setToplist] = useState([]);

  useEffect(() => {
    const getToplist = async () => {
      Loading.show();
      try {
        const data = await API.toplist();
        if (data.code === 200) {
          setToplist(data.list);
        }
      } catch(error) {
        console.log(error);
        Toast.error('获取排行榜异常');
      }
      Loading.hide();
    }

    getToplist();
  }, []);

  if (!toplist.length) return null;
  return (
    <div className="rank-page">
      <p className="title">官方榜</p>
      <div className="list-01">
        {
          toplist.slice(0, 4).map(item => <Item01 key={item.id} data={item} onClick={() => props.history.push(`/rank/${item.id}`)} />)
        }
      </div>
      <p className="title">全球榜</p>
      <div className="list-02">
        {
          toplist.slice(4).map(item => <Item02 key={item.id} data={item} onClick={() => props.history.push(`/rank/${item.id}`)} />)
        }
      </div>
    </div>
  )
}

const Item01 = (props) => {
  const { data, onClick = () => {} } = props;
  return (
    <div className="item-01" onClick={onClick}>
      <div className="item-left">
        <div className="box">
          <img className="image" src={`${data.coverImgUrl}?param=300x300`}/>
          <span className="desc">{data.updateFrequency}</span>
        </div>
      </div>
      <div className="item-right">
        {
          !!data.tracks && data.tracks.map((item, index) => <p key={index} className="tracks">{index+1}.{item.first}-{item.second}</p>)
        }
      </div>
    </div>
  )
}

const Item02 = (props) => {
  const { data, onClick = () => {} } = props;
  return (
    <div className="item-02" onClick={onClick}>
      <div className="box">
        <img className="image" src={`${data.coverImgUrl}?param=300x300`}/>
        <span className="desc">{data.updateFrequency}</span>
      </div>
    </div>
  )
}

export default Rank;