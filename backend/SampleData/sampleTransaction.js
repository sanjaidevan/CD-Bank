import { TransactionModel } from "../model/transactionModel.js";
import { AccountModel } from "../model/accountModel.js";
import { randomUUID } from "crypto";

const descriptions = {
  credit: [
    "Salary Credit",
    "Cash Deposit",
    "Interest Credit",
    "Refund",
    "UPI Received",
  ],
  debit: [
    "ATM Withdrawal",
    "Online Shopping",
    "UPI Payment",
    "Electricity Bill",
    "Restaurant Payment",
  ],
};

const statuses = ["completed", "completed", "completed", "pending"];

const createTransactions = async (transactions) => {
  await TransactionModel.bulkCreate(transactions);
};

export const sampleTransactions = async () => {
  const accounts = await AccountModel.findAll({
    attributes: ["accountNumer"],
    raw: true,
  });

  const transactions = [];

  for (const account of accounts) {
    let currentBalance = account.balance

    // Generate 10 transactions for each account
    for (let i = 0; i < 3; i++) {
      const transactionType = Math.random() > 0.5 ? "credit" : "debit";

      const transferAmount = Math.floor(Math.random() * 9000) + 500;

      // Prevent negative balance
      if (transactionType === "debit" && currentBalance < transferAmount) {
        currentBalance += transferAmount;
      }

      if (transactionType === "credit") {
        currentBalance += transferAmount;
      } else {
        currentBalance -= transferAmount;
      }

      transactions.push({
        id: randomUUID(),
        accountNumber: account.accountNumber,

        transactionDate: new Date(
          Date.now() - (10 - i) * 24 * 60 * 60 * 1000
        ),

        description:
          descriptions[transactionType][
          Math.floor(
            Math.random() * descriptions[transactionType].length
          )
          ],

        transactionType,

        transactionStatus:
          statuses[Math.floor(Math.random() * statuses.length)],

        transferAmount,

        // Closing balance after this transaction
        balance: currentBalance,

        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  await createTransactions(transactions);

  console.log(`Inserted ${transactions.length} transactions.`);
};