import React from 'react';
import styles from './form.module.css';

export default () => {

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(ev);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Name
          <input className={styles.input} type="text" name="name"/>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" name="email"/>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Subject
          <input className={styles.input} type="text" name="subject"/>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Message
          <textarea className={styles.input} type="text" name="message"/>
        </label>
      </div>
      <button className={styles.button}>Send</button>
    </form>
  )
}