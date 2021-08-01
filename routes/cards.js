const router = require('express').Router();
const {createCard, getCards, deleteCard, likeCard, dislikeCard} = require('../controllers/card');

router.get('/', getCards);

router.post('/', createCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

router.delete('/:cardId', deleteCard);

module.exports = router;