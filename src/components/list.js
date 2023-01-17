import React, {useState} from 'react';
import axios from 'axios';
import Form from './form';
import Todo from './todo';

function List(props) {
const [toDoList, setToDoList] = useState([]);
const [todo, setTodo] = useState('');

const getTodos = () => {
    axios.get('/api').then(response => {
       setToDoList(response.data);
    })
};

const addToDo = (options) => {
    axios.post('/api/addTodo', options)
    .then((results) => {
        getTodos();
    })
};

const editTodo = (id, options) => {
    return axios.put(`/api/todo/${id}`, options)
           .then(() => {
            getTodos();
           })
};

const removeTodo = id => {
    axios.delete(`/api/todo/${id}`)
        .then((results) => {
            getTodos();
        })
    }

const completeTodo = id => {
    axios.put(`/api/todo/${id}`, { completed: true  })
        axios.get('/api')
        .then(results => {
        getTodos();
        })
}

React.useEffect(() => {
    getTodos();
}, [])

  return (
    <div>
        <h1>
            To Do List
        </h1>

        <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addToDo({ title: todo });
        }}
      >
        <input
          type="text"
          placeholder="add something to-do"
          value={todo}
          name="text"
          className="form-input"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="form-button">Add</button>
      </form>
        <Todo 
        toDoList={toDoList}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        editTodo={editTodo}
        />
    </div>
  )
}

export default List