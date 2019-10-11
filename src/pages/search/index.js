import React, { useState } from 'react';
import useFocus from '@hooks/useFocus';

import './style.less';

export default function Search() {
  const [keyWord, setKeyWord] = useState('');
  const inputRef = useFocus();

  return (
    <div>
      <div className="search-header">
        <input
          className="search-header-keyword"
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          ref={inputRef}
          value={keyWord}
          onChange={e => setKeyWord(e.target.value)}
        />
      </div>

      <div className="search-content">
        
      </div>
    </div>
  );
}
