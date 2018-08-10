import React, { Component } from 'react';
import { Modal, Popover, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
class Comp extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
          very popover. such engagement
      </Popover>
    );

    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton className="modal-header bg-warning">
            <Modal.Title>Confirm Delete!</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p className="text-center">
                Are you sure you want to delete?
            </p>

          </Modal.Body>
          <Modal.Footer className="text-center">
            <Button onClick={this.props.handleClose}>Close</Button>
            <Button bsStyle="warning" bsSize="small" onClick={this.props.deleteInstance}>
                Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Comp;
