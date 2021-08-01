const router = require('express').Router();
const {createUser, getUsers, getUser, updateUserInfo, updateUserAvatar} = require('../controllers/users');

router.post('/', createUser);

router.get('/:userId', getUser);

router.get('/', getUsers);

router.patch('/me/avatar', updateUserAvatar);

router.patch('/me', updateUserInfo);


module.exports = router;