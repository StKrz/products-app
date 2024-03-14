
// Router = Βιβλιοθήκη του express


// οταν θα δεις μια κληση router.get θα καλεσεις απο το user.controller την findAll
// φερε μοιυ ολες τις διαδικασεις που υπαρχουν στο ../controllers/user.controller
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username', userController.findOne);
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete);

module.exports = router;