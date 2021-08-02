const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouters = require('./routes/users');
const cardRouters = require('./routes/cards');
const {PORT, ERROR_NOT_FOUND, routesNotFoundMessage, mongoServerPath, mongoConnectionSettings} = require('./utils/constant.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoServerPath, mongoConnectionSettings);

app.use((req, res, next) => {
  req.user = {
    _id: '6103efa29812962120f8bceb' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouters);
app.use('/cards', cardRouters);
app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({message: routesNotFoundMessage});
})

app.listen(PORT, () => {
  console.log(`Работает на порте ${PORT}`);
})