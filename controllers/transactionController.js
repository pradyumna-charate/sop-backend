const Transaction = require('../models/transactionModel');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the transaction.' });
  }
};
// To get all the transaction details for the report history
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    const { transactionId } = req.params;
  
    try {
      const transaction = await Transaction.findOne({ transactionid: transactionId });
  
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found.' });
      }
  
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
    }
  };
  
  // Send transaction details and get transaction ID
exports.sendTransactionDetails = async (req, res) => {
 
  try {
    const newTransaction = new Transaction({
      ...req.body
    });

    const savedTransaction = await newTransaction.save();

    console.log('Saved transaction:', savedTransaction); // Debug log to check saved transaction
    
    res.status(201).json({ transactionId: savedTransaction.transactionid });
  } catch (error) {
    console.error('Error creating transaction:', error); // Debug log to check errors
    res.status(500).json({ error: 'An error occurred while creating the transaction.' });
  }
};
