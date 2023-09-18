const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/reports/:transactionId', transactionController.getTransactionById);

router.post('/send-transaction-details', transactionController.sendTransactionDetails);

router.get('/reports', transactionController.getAllTransactions);
module.exports = router;


