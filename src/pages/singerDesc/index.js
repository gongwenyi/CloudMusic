import React, { useState, useEffect } from 'react';
import { PageContainer, Loading, Toast } from '../../components';
import API from '../../api';
import { getQueryString } from '../../utils';
import './style.less';

const SingerDesc = props => {
  const [id] = useState(props.match.params.id);
  const name = window.decodeURIComponent(getQueryString('name'));

  const [briefDesc, setBriefDesc] = useState();
  const [introduction, setIntroduction] = useState([]);

  useEffect(() => {
    const getArtistsDesc = async () => {
      Loading.show();
      try {
        const data = await API.getArtistsDesc(id);
        if (data.code === 200) {
          setBriefDesc(data.briefDesc);
          setIntroduction(data.introduction);
        }
      } catch (error) {
        console.log(error);
        Toast.error('获取歌手介绍异常');
      }
      Loading.hide();
    };
    getArtistsDesc();
  }, [id]);

  if (!briefDesc) return null;
  return (
    <PageContainer className="singer-desc-page">
      <Item title={`${name}简介`} desc={briefDesc} />
      {introduction.map(item => (
        <Item key={item.ti} title={item.ti} desc={item.txt} />
      ))}
    </PageContainer>
  );
};

const Item = props => {
  const { title, desc } = props;
  return (
    <div className="item">
      <div className="title">{title}</div>
      <div className="desc">{desc}</div>
    </div>
  );
};

export default React.memo(SingerDesc);
