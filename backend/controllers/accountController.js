const mongoose = require('mongoose');
const { Account } = require('../models/accountModel');
const { User } = require('../models/userModel');
const z = require('zod');

const moneyTransferSchema = z.object({
  amount: z.number().positive(),
  reciever: z.string(),
});

const getBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const account = await Account.findOne({ userId });
    // console.log('account is: ', account);
    if (!account) {
      return res.status(403).json({ error: 'Invalid account' });
    }
    const balance = account.balance;
    res.status(200).json({ message: balance });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const sendMoney = async (req, res) => {
  const userId = req.userId;
  const inputData = req.body;

  try {
    const zodResponse = moneyTransferSchema.safeParse(inputData);
    const dataResponse = zodResponse.data;
    // console.log(dataResponse);
    if (!zodResponse.success) {
      console.log(zodResponse.error);
      res.status(401).json({ error: zodResponse.error });
      return;
    }

    const amount = dataResponse.amount;
    const reciever = dataResponse.reciever;
    // console.log('reciever', reciever);
    const session = await mongoose.startSession();
    session.startTransaction();
    const senderAccount = await Account.findOne({ userId }).session(session);
    if (!senderAccount) {
      await session.abortTransaction();
      return res.status(403).json({ error: 'Invalid account' });
    }
    if (userId === reciever) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Cannot transfer money to self' });
    }
    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(401).json({ error: 'Insufficent balance' });
    }
    const recieverAccount = await Account.findOne({ userId: reciever }).session(
      session
    );
    if (!recieverAccount) {
      await session.abortTransaction();
      return res.status(403).json({ error: 'Invalid reciever' });
    }
    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: reciever },
      { $inc: { balance: amount } }
    ).session(session);
    await session.commitTransaction();
    res.status(200).json({
      message: 'Transaction successful',
      amountSent: amount,
      remainingBalance: senderAccount.balance - amount,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getBalance, sendMoney };
