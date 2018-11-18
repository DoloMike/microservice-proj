const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController.js');

/*
 * GET
 */
router.get('/', customerController.list);

/*
 * GET
 */
router.get('/:id', customerController.show);

/*
 * POST
 */
router.post('/', customerController.create);

/*
 * PUT
 */
router.put('/:id', customerController.update);

/*
 * DELETE
 */
router.delete('/:id', customerController.remove);

module.exports = router;
