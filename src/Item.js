import React, { useCallback } from "react";
import "./Item.css";

export const Item = ({ id, isComplete, description, onComplete }) => {
  const handleCompleteChange = useCallback(() => {
    onComplete(id, { isComplete: !isComplete });
  }, [onComplete, id, isComplete]);

  return (
    <div className={`item ${isComplete ? "complete" : ""}`} data-testid="item">
      <input
        checked={isComplete}
        className="complete-check"
        onChange={handleCompleteChange}
        type="checkbox"
      />
      <span className="description">{description}</span>
    </div>
  );
};
