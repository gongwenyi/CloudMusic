import React from 'react';
import './style.less';

const HorizontalList = (props) => {
  const { title, data = [], selected = '', onClick = () => {} } = props;

  return (
    <div className="horizontal-scroll">
      <span className="title">{title}</span>
      {
        data.map(item => <span className={selected === item.code ? 'active' : ''} onClick={() =>onClick(item.code) } key={item.code}>{item.name}</span>)
      }
    </div>
  )
}

export default React.memo(HorizontalList);