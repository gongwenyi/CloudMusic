import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

function createModal(props) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  
  ReactDOM.render(<Modal {...props} onClose={() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }} />, div);
}

function Alert(params) {
  return createModal({
    type: 'alert',
    ...params
  })
}
function Confirm(params) {
  return createModal({
    type: 'confirm',
    ...params
  })
}
function Prompt(params) {
  return createModal({
    type: 'prompt',
    ...params
  })
}

export default {
  Alert,
  Confirm,
  Prompt,
}

export {
  Alert,
  Confirm,
  Prompt,
}