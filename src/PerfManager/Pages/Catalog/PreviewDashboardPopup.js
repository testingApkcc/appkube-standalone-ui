import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
//import './UnimplementedFeaturePopup.css';
import previewDashboard from "./img/preview-dashboard.png";

export class PreviewDashboardPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="modal-container perfmanager-modal-container preview-dashboard-popup"
      >
        <ModalBody style={{ maxHeight: "550px" }}>
          <button className="nabtn-close" onClick={this.toggle}>
          <i class="far fa-times"></i>
          </button>
          <button className="nabtn-left">
          <i class="far fa-chevron-left"></i>
          </button>
          <button className="nabtn-right">
          <i class="far fa-chevron-right"></i>
          </button>
          <div className="slider-content">
            <div className="item-image active">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
          </div>
          <ul className="slider-buttons">
            <li className="button active"></li>
            <li className="button"></li>
            <li className="button"></li>
            <li className="button"></li>
          </ul>
        </ModalBody>
      </Modal>
    );
  }
}