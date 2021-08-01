const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouters = require('./routes/users');
const cardRouters = require('./routes/cards');
const {PORT = 3000} = process.env;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.user = {
    _id: '6103efa29812962120f8bceb' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouters);
app.use('/cards', cardRouters);

app.listen(PORT, () => {
  console.log(`Работает на порте ${PORT}`);
  console.log('Привет мир')
  console.log('В чём смысл?')
})