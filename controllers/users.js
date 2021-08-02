const User = require('../models/user');
const {
  ERROR_NOT_FOUND,
  ERROR_INCORECT_DATA,
  ERROR_DEFAULT,
  incorrectDataMessage,
  defaultMessageError,
  userNotFoundMessage,
  VALIDATION_ERROR_CODE,
  CASTERROR_CODE
} = require('../utils/constant');


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    });
};

module.exports.getUser = ( req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if(user === null) {
        return res.status(ERROR_NOT_FOUND).send({message: incorrectDataMessage})
      }
      res.send({data: user});
    })
    .catch((err) => {
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError});
      }
    })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError})
      }
    })
};

module.exports.updateUserInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then(user => {
      if(user === null) {
        res.status(ERROR_NOT_FOUND).send({message: userNotFoundMessage});
      } else {
        res.send({data: user});
      }
    })
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError})
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar: avatar}, {new: true, runValidators: true})
    .then(user => {
      if(user === null) {
        res.status(ERROR_NOT_FOUND).send({message: userNotFoundMessage});
      } else {
        res.send({data: user})
      }
    })
    .catch((err) => {
      if(err.name === VALIDATION_ERROR_CODE) return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      if(err.name === CASTERROR_CODE) {
        return res.status(ERROR_INCORECT_DATA).send({message: incorrectDataMessage});
      } else {
        res.status(ERROR_DEFAULT).send({message: defaultMessageError})
      }
    });
};
