const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  currentUserInfo,
} = require('../controllers/users');

router.get('/', getUsers); // - получить пользователей
router.get('/me', currentUserInfo);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), updateAvatar);

module.exports = router;
