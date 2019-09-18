import React from 'react';
import Alert from './Alert';
import Confirm from './Confirm';
import Prompt from './Prompt';

const Modal = (props) => {

  const { type, onClose, onOk = () => {}, onCancel = () => {} } = props;

  const handleCancel = () => {
    onClose();
    onCancel();
  }

  const handleOk = (value) => {
    onClose();
    onOk(value);
  }

  const renderModal = (type) => {
    switch(type) {
      case 'alert':
        return <Alert handleOk={handleOk} {...props} />
      case 'confirm':
        return <Confirm handleOk={handleOk} handleCancel={handleCancel} {...props} />
      case 'prompt':
        return <Prompt handleOk={(value) => handleOk(value)} handleCancel={handleCancel} {...props} />
    }
  }

  return renderModal(type)
}

export default Modal;