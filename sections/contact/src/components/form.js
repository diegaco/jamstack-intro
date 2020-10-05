import React, {useReducer} from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
  // status: 'ERROR'
  status: 'IDLE'
};

const reducer = (state, {type, field, payload}) => {
  switch (type) {
    case 'updateFieldValue':
      return { ...state, [field]: payload };
    case 'updateStatus':
      return { ...state, status: payload}
    case 'reset':
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = status => dispatch({ type: 'updateStatus', payload: status });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setStatus('PENDING');

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStatus('SUCCESS');
      })
      .catch(err => {
        console.log(err)
        setStatus('ERROR');
      });
  }


  // Traditional Way
  // const handleChange = (ev) => {
  //   ev.preventDefault();
  //   dispatch({type: 'updateFieldValue', field: ev.target.name, payload: ev.target.value})
  // }

  // Currying Functional
  const updateFieldValue = field => ev => {
    dispatch({type: 'updateFieldValue', field, payload: ev.target.value})
  }

  if (state.status === 'SUCCESS') {
    return (
        <p className={styles.success}>
          Message was sent
          <button
            type="reset"
            onClick={() => dispatch({ type: 'reset' })}
            className={`${styles.button} ${styles.centered}`}
          >
            Reset
          </button>
        </p>
    )
  }

  return (
    <>
      {
        state.status === 'ERROR' && (
          <p className={styles.error}>
            Something went wrong. Please try again.
        </p>
      )}
        <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Name
              <input
                className={styles.input}
                type="text"
                name="name"
                value={state.name}
                // onChange={handleChange}
                onChange={updateFieldValue('name')}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                type="email"
                name="email"
                value={state.email}
                // onChange={handleChange}
                onChange={updateFieldValue('email')}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Subject
              <input
                className={styles.input}
                type="text"
                name="subject"
                value={state.subject}
                // onChange={handleChange}
                onChange={updateFieldValue('subject')}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Message
              <textarea
                className={styles.input}
                name="message"
                value={state.body}
                // onChange={handleChange}
                onChange={updateFieldValue('message')}
              />
            </label>
          </div>
          <button className={styles.button}>Send</button>
        </form>
    </>
  )
}