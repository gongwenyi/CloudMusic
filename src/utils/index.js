export const getSongUserNames = (ar, al) => {
  let names = '';
  for (let i = 0; i < ar.length; i++) {
    if (i === 0) {
      names += ar[i].name;
    } else {
      names += `/${ar[i].name}`;
    }
  }
  if (al && al.name) {
    names += `-${al.name}`;
  }
  return names;
};

export const formatMinute = duration => {
  const time = parseInt(duration);
  if (time <= 0) {
    return '00:00';
  }
  const minute = formatNumber(parseInt(time / 60)); // 分钟
  const second = formatNumber(parseInt(time % 60)); // 秒钟
  return `${minute}:${second}`;
};

export const fromatTime = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  return `${year}.${month}.${day}`;
};

const formatNumber = number => {
  return number < 10 ? `0${number}` : number;
};

export const formatLyric = lyric => {
  const arr = lyric.split('\n');
  const lic = arr.map(item => {
    const timeStr = item.slice(0, item.indexOf(']') + 1);
    const text = item.slice(item.indexOf(']') + 1);
    // console.log('timeStr=', timeStr)
    if (timeStr || text) {
      const minute = parseInt(timeStr.slice(1, timeStr.indexOf(':'))) * 60;
      const second = parseFloat(timeStr.slice(timeStr.indexOf(':') + 1, -1));
      const time = (minute + second).toFixed(3);
      // console.log('second=', second)
      // console.log('time=', time)
      // console.log('text=', text)
      if (time && text) {
        return {
          time: time,
          text: text
        };
      }
      return {
        time: '',
        text: ''
      };
    }
    return {
      time: '',
      text: ''
    };
  });
  return lic;
};

export const getQueryString = variable => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return '';
};
