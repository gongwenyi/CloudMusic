import React from 'react';
import './style.less';

const Alert = (props) => {

  const { title = '', content = '', okText = '确认', cancelText = '取消', handleOk, handleCancel } = props;

  if (content) {
    return (
      <div className="modal-component">
        <div className="modal-content">
          <h3 className="header">{ title }</h3>
          <div className="content">
            <p>{ content }</p>
          </div>
          <div className="footer">
            <div className="btn btn-cancel" onClick={handleCancel}>{ cancelText }</div>
            <div className="btn btn-ok" onClick={handleOk}>{ okText }</div>
          </div>
        </div>
      </div>
    )
  }
  return null;
}

export default Alert;