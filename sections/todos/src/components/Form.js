import React, {useState} from 'react'
import axios from 'axios';
import styles from './form.module.css';

const Form = ({reloadTodos}) => {
  const [text, setText] = useState('');

  const handleChange = ev => {
    setText(ev.target.value);
  }

  const handleSubmit = async ev => {
    ev.preventDefault();
    if (text == '') return;

    await axios.post('/api/create-todo', {
      text
    });

    setText('');
    reloadTodos();
  }

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor='todo'>
        Add a Todo
        <input onChange={handleChange} type='text' className={styles.input} id='todo' value={text} />
      </label>
      <button className={styles.button}>Save Todo</button>
    </form>
  )
}

export default Form;
