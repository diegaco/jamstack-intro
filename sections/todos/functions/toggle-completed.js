const sendQuery = require('./utils/send-query');

const TOOGLE_COMPLETED = `
  mutation($id: ID!, $text: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: {text: $text, completed: $completed}) {
      _id
      completed
    }
  }
`;

exports.handler = async event => {
  const { id, text, completed } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(TOOGLE_COMPLETED, {
    id,
    text,
    completed
  });

  if (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      body: JSON.stringify({errors})
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updatedTodo: data.updatedTodo})
  }
};