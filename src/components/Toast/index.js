import createToast from './toast';

const toast = (type, content, duration = 2000) => {
  return createToast.addNotice({ type, content, duration });
}

export default {
  info(content, duration) {
    return toast('info', content, duration);
  },
  success(content, duration) {
    return toast('success', content, duration);
  },
  warning(content, duration) {
    return toast('warning', content, duration);
  },
  error(content, duration) {
    return toast('error', content, duration);
  }
}