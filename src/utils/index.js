export const getSongUserNames = (ar, al) => {
  let names = '';
  for(let i=0; i<ar.length; i++) {
    if (i === 0) {
      names += ar[i].name;
    } else {
      names += `/${ar[i].name}`
    }
  }
  names += `-${al.name}`;
  return names;
}