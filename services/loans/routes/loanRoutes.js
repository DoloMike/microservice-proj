const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController.js');

/*
 * GET
 */
router.get('/', loanController.list);

/*
 * GET
 */
router.get('/:id', loanController.show);

/*
 * POST
 */
router.post('/', loanController.create);

/*
 * PUT
 */
router.put('/:id', loanController.update);

/*
 * DELETE
 */
router.delete('/:id', loanController.remove);

module.exports = router;
