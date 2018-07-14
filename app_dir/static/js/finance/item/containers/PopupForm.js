import React, { Component } from 'react';

export class PopupForm extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="msg-compose" >
          <div className="msg-compose-wrapper">
            <div className="msg-title-bar">
              <div className="icon left"><i className="fa fa-envelope"></i></div>
              <div className="compose-actions right">
                <a href="#" className="minimize mr-15">
                  <i className="fa fa-minus"></i>
                </a>
                <a href="#" className="closex">
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="msg-recipients" >
              <div className="to-list">
                <input placeholder="To" type="text" />
                <span className="arrow"></span>
              </div>
              <div className="cc-list collapse">
                <input placeholder="cc" type="text" />
              </div>
              <div className="bcc-list collapse">
                <input placeholder="Bcc" type="text" />
              </div>
            </div>
            <div className="msg-subject">
              <input placeholder="Subject" type="text" />
            </div>
            <div className="msg-footer" >
              <div className="left">
                <a href="#" className="send-btn">SEND</a>
                <a href="#"><i className="fa fa-paperclip"></i></a>
                <a href="#" className="font"></a>
              </div>
              <div className="right"><a href="#"><i className="fa fa-trash"></i></a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupForm;
