export const getSongUserNames = (ar, al) => {
  let names = '';
  for(let i=0; i<ar.length; i++) {
    if (i === 0) {
      names += ar[i].name;
    } else {
      names += `/${ar[i].name}`
    }
  }
  if (al && al.name) {
    names += `-${al.name}`;
  }
  return names;
}

export const formatMinute = (duration) => {
  const time = parseInt(duration);
  if (time <= 0) {
    return '00:00'
  }
  const minute = formatNumber(parseInt(time / 60)); // 分钟
  const second = formatNumber(parseInt(time % 60)); // 秒钟
  return `${minute}:${second}`;
}

const formatNumber = (number) => {
  return number < 10 ? `0${number}` : number;
}