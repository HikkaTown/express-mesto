const Card = require('../models/card');

const ERROR_NOT_FOUND = 404;
const ERROR_INCORECT_DATA = 400;
const ERROR_DEFAULT = 500;

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const {name, link, _id = owner} =  req.body;
  Card.create({name, link, owner: _id})
    .then(card => res.send({data: card}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({data: cards}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({data: card}))
    .catch((err) => {
      if(err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({message: 'Запрашиваемая карточка не найдена'});
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true})
    .then(card => res.send({data: card}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {likes: req.user._id}
  }, {new: true})
    .then(card => res.send({data: card}))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_INCORECT_DATA).send({message: 'Переданы неверные данные'});
      res.status(ERROR_DEFAULT).send({message: 'Произошла ошибка'});
    });
};