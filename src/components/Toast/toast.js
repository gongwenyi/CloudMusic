import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './iconfont';
import './style.less';

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    }
  }

  addNotice(notice) {
    notice.key = this.getNoticeKey();
    const { notices } = this.state;
    notices.push(notice);
    this.setState({
      notices
    });

    if (notice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key)
      }, notice.duration);
    }
  }

  removeNotice(key) {
    this.setState((state) => ({
      notices: state.notices.filter(item => item.key !== key)
    }))
  }

  getNoticeKey() {
    return this.state.notices.length + Date.now();
  }
  
  render() {
    return (
      <TransitionGroup className="toast-component">
        {
          this.state.notices.map(item => (
            <CSSTransition
              key={item.key} 
              timeout={300}
              classNames="toast"
            >
              {/* <div className="content">
                <span>{item.content}</span>
              </div> */}
              <Notice {...item} />
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    )
  }
}

const Notice = (props) => {
  const { type, content } = props;
  const icons = {
    info: 'icon-info-circle-fill',
    success: 'icon-check-circle-fill',
    warning: 'icon-warning-circle-fill',
    error: 'icon-close-circle-fill',
  };
  
  return (
    <div className={`content ${type}`}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${icons[type]}`} />
      </svg>
      <span>{content}</span>
    </div>
  )
}

function createToast() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const refToast = React.createRef();
  ReactDOM.render(<Toast ref={refToast}/>, div);
  return {
    addNotice(notice) {
      refToast.current.addNotice(notice);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }
}

export default createToast();
