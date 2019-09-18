import React, { useState } from 'react';
import './style.less';

const Alert = (props) => {

  const { title = '', content = '', okText = '确认', cancelText = '取消', handleOk, handleCancel } = props;

  const [value, setValue] = useState('');

  return (
    <div className="modal-component">
      <div className="modal-content">
        <h3 className="header">{ title }</h3>
        <div className="content">
          <p>{ content }</p>
        </div>
        <div className="content-form">
          <input className="form-input" value={value} type="text" onChange={e => setValue(e.target.value)}/>
        </div>
        <div className="footer">
          <div className="btn btn-cancel" onClick={handleCancel}>{ cancelText }</div>
          <div className="btn btn-ok" onClick={() => handleOk(value)}>{ okText }</div>
        </div>
      </div>
    </div>
  )
}

export default Alert;