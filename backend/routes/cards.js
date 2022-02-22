const router = require('express').Router();
const {
  getAllCards, deleteCardbyId, createNewCard, likeCardbyId, unlikeCardbyId,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createNewCard);
router.delete('/:cardId', deleteCardbyId);
router.put('/:cardId/likes', likeCardbyId);
router.delete('/:cardId/likes', unlikeCardbyId);

module.exports = router;
