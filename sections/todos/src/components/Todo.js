import React from 'react'
import axios from 'axios';
import styles from './todo.module.css';

const Todo = ({ todo, reloadTodos }) => {
  const toggleCompleted = () => {
    axios
      .post('/api/toggle-completed', {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed
    }).then(reloadTodos)
  };

  return (
    <>
      <label htmlFor={`todo-toggle-${ todo._id }`} className={styles.label}>
        Mark complete
      </label>
      <input type="checkbox" id={`todo-toggle-${todo._id}`} checked={todo.completed} className={styles.toggle} onChange={toggleCompleted} />
      <p className={`${styles.text} ${todo.completed && styles.completed}`}>
        {todo.text}
      </p>
    </>
  )
}

export default Todo
