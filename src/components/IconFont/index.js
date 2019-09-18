import React from 'react';

const IconFont = (props) => {
  const { name, size = 16, color = '#333', style, onClick = () => {} } = props;
  return (
    <i onClick={onClick} className={`iconfont ${name}`} style={{fontSize: size + 'px', color, ...style}} />
  )
}

export default React.memo(IconFont);