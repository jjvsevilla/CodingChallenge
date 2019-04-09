import React from "react";
import { Modal, Button } from 'antd';
import "./TastingSession.css";

const confirm = Modal.confirm;

function totalItems(items) {
  return items.length || 0;
}

const TastingSession = ({
  id,
  wines,
  wineTasters,
  reviews,
  selectTastingSession,
  deleteTastingSession
}) => {

  function showConfirm() {
    confirm({
      title: `Do you want to delete tasting session ${id}?`,
      content: (
        <div className="modal-content">
          <p>Tasting Session Detail</p>
          <p>Wines: {totalItems(wines)}</p>
          <p>WineTasters: {totalItems(wineTasters)}</p>
          <p>Reviews: {totalItems(reviews)}</p>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteTastingSession(id)
      },
      onCancel() {},
    });
  }

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
          onClick={showConfirm}
          type="danger"
          icon="delete"
        >Delete</Button>
      </div>
    </li>
  );
};

export default TastingSession;