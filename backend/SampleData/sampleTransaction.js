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
    attributes: ["acc_num"],
    raw: true,
  });

  const transactions = [];

  for (const account of accounts) {
    // Opening balance
    let currentBalance = Math.floor(Math.random() * 90000) + 10000;

    // Generate 10 transactions for each account
    for (let i = 0; i < 10; i++) {
      const transaction_type = Math.random() > 0.5 ? "credit" : "debit";

      const amt_transfer = Math.floor(Math.random() * 9000) + 500;

      // Prevent negative balance
      if (transaction_type === "debit" && currentBalance < amt_transfer) {
        currentBalance += amt_transfer;
      }

      if (transaction_type === "credit") {
        currentBalance += amt_transfer;
      } else {
        currentBalance -= amt_transfer;
      }

      transactions.push({
        transaction_id: randomUUID(),
        acc_num: account.acc_num,

        transaction_date: new Date(
          Date.now() - (10 - i) * 24 * 60 * 60 * 1000
        ),

        description:
          descriptions[transaction_type][
          Math.floor(
            Math.random() * descriptions[transaction_type].length
          )
          ],

        transaction_type,

        transaction_status:
          statuses[Math.floor(Math.random() * statuses.length)],

        amt_transfer,

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