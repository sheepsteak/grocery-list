import React, { useCallback, useRef } from "react";
import "./Entry.css";

export const Entry = ({ loading, onSubmit }) => {
  const nameRef = useRef();
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      onSubmit({
        description: nameRef.current.value,
      });

      nameRef.current.value = "";
    },
    [nameRef, onSubmit],
  );

  return (
    <form className="entry" onSubmit={handleSubmit}>
      <label className="label" htmlFor="description">
        Enter a new item:
      </label>
      <input
        className="description-input"
        id="description"
        name="description"
        placeholder="Add an item…"
        ref={nameRef}
        required
        type="text"
      />
      <button className="add" type="submit">
        Add
      </button>
    </form>
  );
};
