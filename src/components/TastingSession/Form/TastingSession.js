import React from "react";

function totalItems(items) {
  return items.length || 0;
}

const TastingSession = ({
  id,
  wines,
  wineTasters,
  reviews,
  selectTastingSession,
  deleteTastingSession,
  toggle
}) => {
  return (
    <li>
      <div>
        <div>
          <p>Tasting SessionId: {id}</p>
          <p>Wines: {`${totalItems(wines)}`} - WineTasters: {`${totalItems(wineTasters)}`} - Reviews: {`${totalItems(reviews)}`}</p>
        </div>
        <div>
          <button onClick={() => selectTastingSession(id)}>Edit</button>
          <button onClick={() => deleteTastingSession(id)}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default TastingSession;