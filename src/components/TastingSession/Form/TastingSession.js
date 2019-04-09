import React from "react";
import { Modal, Button } from 'antd';

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
      title: 'Do you want to delete this Tasting Session?',      
      onOk() {
        deleteTastingSession(id)
      },
      onCancel() {},
    });
  }

  return (
    <li>
      <div>
        <div>
          <p>Tasting SessionId: {id}</p>
          <p>Wines: {`${totalItems(wines)}`} - WineTasters: {`${totalItems(wineTasters)}`} - Reviews: {`${totalItems(reviews)}`}</p>
        </div>
        <div>
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
      </div>
    </li>
  );
};

export default TastingSession;