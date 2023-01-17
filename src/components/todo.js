import React, { useState } from "react";
import Form from "./form";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ toDoList, completeTodo, removeTodo, editTodo, markComplete }) {
  const [edit, setEdit] = useState({
    id: null,
    title: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    console.log(edit);
  }, [edit]);

  if (isEditing) {
    return (
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          editTodo(edit.id, { title: edit.title }).then((results) => {
            setIsEditing(false);
          });
        }}
      >
        <input
          type="text"
          placeholder="add something to-do"
          value={edit.title}
          name="text"
          className="form-input"
          onChange={(e) =>
            setEdit((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <button className="form-button">Edit</button>
      </form>
    );
  }

  return toDoList.map((todo, index) => (
    <div
      className={todo.completed ? "todo-row complete" : "todo-row"}
      key={todo.id}
    >
      <div key={todo.id} >
        {todo.title}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => {
            setIsEditing(true);
            setEdit({ id: todo.id, title: todo.title });
          }}
          className="edit-icon"
        />
        <button onClick={() => completeTodo(todo.id)} className="complete-button">Mark as complete</button>
      </div>
    </div>
  ));
}

export default Todo;
