import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

const Loading = () => {
  return (
    <div className="loading-component">
      <div />
      <div />
    </div>
  )
}

function createLoading() {
  let div = null;
  let loadingCount = 0;
  return {
    show() {
      loadingCount++;
      if (!div) {
        div = document.createElement('div');
        document.body.appendChild(div);
        ReactDOM.render(<Loading/>, div);
      }
    },
    hide() {
      loadingCount--;
      if (loadingCount < 0) {
        loadingCount = 0;
      }
      if (div && loadingCount === 0) {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        div = null;
      }
    }
  }
}

export default createLoading();