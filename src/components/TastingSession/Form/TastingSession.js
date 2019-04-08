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
      Tasting SessionId: {id} - Wines: {`${totalItems(wines)}`} - WineTasters: {`${totalItems(wineTasters)}`} - Reviews: {`${totalItems(reviews)}`}
      <button onClick={() => selectTastingSession(id, toggle, false)}>Edit</button>
      <button onClick={() => deleteTastingSession(id)}>Delete</button>
    </li>
  );
};

export default TastingSession;