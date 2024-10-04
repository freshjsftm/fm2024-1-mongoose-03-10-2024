const express = require('express');
const { createMessage, getAllMessages, getMessage, updateMessage, deleteMessage} = require('./controllers/message.controller');

const app = express();
app.use(express.json());

app.post('/messages', createMessage);
app.get('/messages', getAllMessages);
//app.delete('/messages', deleteManyMessages);
//app.patch('/messages', updateManyMessage);

app.get('/messages/:msgId', getMessage);
app.patch('/messages/:msgId', updateMessage);
app.delete('/messages/:msgId', deleteMessage);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ errors: [err.message] });
});

module.exports = app;
