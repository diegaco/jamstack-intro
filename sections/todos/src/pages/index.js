import React, { useEffect, useState} from 'react';
import styles from './index.module.css';
import axios from 'axios';
import Todo from '../components/Todo';
import Form from '../components/Form';

export default () => {
  const [status, setStatus] = useState('loading');
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let canceled = false;

    if (status !== 'loading') { return; }

    axios('/api/get-all-todos').then(result => {
      if (canceled === true) return;

      if (result.status !== 200) {
        console.error('Error loading TODOS', result);
        return;
      }

      setTodos(result.data.todos);
      setStatus('loaded');
    });

    return () => { canceled = true }

  }, [status]);

  const reloadTodos = () => setStatus('loading');

  return (
    <main>
      <h1 className={styles.heading}>
        JAMSTACK Todos
      </h1>
      <Form reloadTodos={reloadTodos}/>
      {
        todos ?
          <ul className={styles.todos}>
            {todos.map(todo => <li className={styles.todo} key={todo._id}><Todo todo={todo} reloadTodos={reloadTodos}/></li>)}
          </ul> :
        <p className={styles.loading}>loading todoss...</p>
      }
    </main>
  )
}
