import React, {Fragment} from 'react';
import { IconFont, } from '..';
import { getSongUserNames } from '../../utils';
import './style.less';

const PlayerList = (props) => {
  const { show, playlist, currentIndex, onHide, onPlayIndex } = props;

  return ( 

    <Fragment>
      <div  className={`player-list-mask ${show ? 'show' : ''}`} onClick={onHide}/>
      <div  className={`player-list ${show ? 'show' : ''}`}>
        { playlist.map((item, index) => <ListItem key={item.id} index={index} data={item} currentIndex={currentIndex} onPlayIndex={() => onPlayIndex(index)} />)}
      </div>
    </Fragment> 
  )
}

const ListItem = (props) => {
  const { data, index, currentIndex, onPlayIndex } = props;
  const active = index === currentIndex;
  const className = active ? 'active' : '';
  return (
    <div onClick={onPlayIndex} className="item">
      { !!active && <IconFont name="iconCTXT_playing" size="18" color="#d43c33" style={{marginRight: '5px'}} /> }
      <p className={`title ellipsis ${className}`}>
        {data.name}{data.alia && data.alia.length ? `（${data.alia[0]}）` : ''}<span className={`name ${className}`}>&nbsp;-&nbsp;{getSongUserNames(data.ar)}</span>
      </p>
    </div>
  )
}

export default React.memo(PlayerList);