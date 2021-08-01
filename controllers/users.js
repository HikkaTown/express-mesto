const User = require('../models/user');

const ERROR_NOT_FOUND = 404;
const ERROR_INCORECT_DATA = 400;
const ERROR_DEFAULT = 500;


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    });
};

module.exports.getUser = ( req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send({data: user});
    })
    .catch((err) => {
      if(err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({message: 'Запрашиваемый пользователь не найден'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'})
    })
};

module.exports.updateUserInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true})
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      if(err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({message: 'Запрашиваемый пользователь не найден'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'})
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatarLink } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar: avatarLink}, {new: true})
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      if(err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({message: 'Запрашиваемый пользователь не найден'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'})
    });
};
