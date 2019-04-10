import React, { Component } from "react";
import { Modal, Button, Alert } from 'antd';
import "./TastingSession.css";

function totalItems(items) {
  return items.length || 0;
}

class TastingSession extends Component {
  state = {
    showModal: false
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  render() {
    const {
      id,
      wines,
      wineTasters,
      reviews,
      selectTastingSession,
      deleteTastingSession,
      deleting,
      deleteError
    } = this.props;
    const { showModal } = this.state;

    return (
      <li className="tasting-session">
        <p>Tasting SessionId: {id}</p>
        <p>Wines: {`${totalItems(wines)}`} - WineTasters: {`${totalItems(wineTasters)}`} - Reviews: {`${totalItems(reviews)}`}</p>
        <div className="actions">
          <Button
            onClick={() => selectTastingSession(id)}
            type="primary"
            icon="edit"
          >Edit</Button>
          <Button
            onClick={this.toggleModal}
            type="danger"
            icon="delete"
          >Delete</Button>
        </div>

        <Modal
          title={`Do you want to delete tasting session ${id}?`}
          visible={showModal}
          onCancel={this.toggleModal}
          footer={[
            <Button key="cancel" disabled={deleting} onClick={this.toggleModal}>Cancel</Button>,
            <Button key="delete" type="danger" loading={deleting} onClick={() => deleteTastingSession(id)}>Ok</Button>,
          ]}
        >
          <div className="modal-content">
            <p>Tasting Session Detail</p>
            <p>Wines: {totalItems(wines)}</p>
            <p>WineTasters: {totalItems(wineTasters)}</p>
            <p>Reviews: {totalItems(reviews)}</p>
            {deleteError && <Alert message={deleteError.message} type="error" />}
          </div>
        </Modal>
      </li>
    );
  }
};

export default TastingSession;