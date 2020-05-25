import React, {useReducer} from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
  status: 'ERROR'
};

const reducer = (state, {type, field, payload}) => {
  switch (type) {
    case 'updateFieldValue':
      return { ...state, [field]: payload };
    case 'updateStatus':
      return { ...state, status: payload}
    default:
      return INITIAL_STATE;
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(ev);
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

  if (state.status === 'SUCESS') {
    return (
      <p className={styles.success}>
        Message was sent
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