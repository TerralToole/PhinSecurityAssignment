import React, { useState, useEffect, useRef } from "react";

function Form(props) {
  const [toDo, setToDo] = useState("");

  const toDoRef = useRef(null);

  useEffect(() => {
    toDoRef.current.focus();
  });

  const handleChange = (e) => {
    setToDo(e.target.value);
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          props.formSubmit({ title: toDo });
        }}
      >
        <input
          type="text"
          placeholder="add something to-do"
          value={toDo}
          name="text"
          className="form-input"
          onChange={handleChange}
          ref={toDoRef}
        />
        <button className="form-button">Add</button>
      </form>
    </div>
  );
}

export default Form;
