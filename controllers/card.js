const Card = require('../models/card');
const {
  ERROR_NOT_FOUND,
  ERROR_INCORECT_DATA,
  ERROR_DEFAULT,
  incorrectDataMessage,
  defaultMessageError,
  cardNotFoundMessage,
  VALIDATION_ERROR_CODE,
  CASTERROR_CODE
} = require('../utils/constant');

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const {name, link, _id = owner} =  req.body;
  Card.create({name, link, owner: _id})
    .then(card => res.send({data: card}))
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({data: cards}))
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(card === null) {
        res.status(ERROR_NOT_FOUND).send({message: cardNotFoundMessage});
      } else {
        res.send({data: card})
      }
    })
    .catch((err) => {
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: cardNotFoundMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true, runValidators: true})
    .then(card => {
      if(card === null) {
        res.status(ERROR_NOT_FOUND).send({message: cardNotFoundMessage});
      } else {
        res.send({data: card})
      }
    })
    .catch((err) => {
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {likes: req.user._id}
  }, {new: true, runValidators: true})
    .then(card => {
      if(card === null) {
        res.status(ERROR_NOT_FOUND).send({message: cardNotFoundMessage});
      } else {
        res.send({data: card})
      }
    })
    .catch((err) => {
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};