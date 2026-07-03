import { AccountModel } from "../model/accountModel.js";


const createAccounts = async (accounts) => {
  await AccountModel.bulkCreate(accounts);
}

export const sampleAccounts = async () => {
  const sampleCustomers = [{
    id: '05bb6b76-9e9c-461a-a77c-5d8735d3912d',
    firstName: 'Vikram',
    lastName: 'Singh',
    dob: '1990-09-12',
    email: 'vikram.singh@example.com',
    mobile: '+919876543214',
    password: '$2b$10$s41.0Nw25tVTrKXmSrgCQe7AtY3Xr7en4rLAmtnUZofimMSQqFAO6', isActive: 'true',
    createdAt: '2026-06-30 06:05:34',
    updatedAt: '2026-06-30 06:05:34'
  }]

  let currentBalance = Math.floor(Math.random() * 90000) + 10000;
  const generateAccountNumber = () =>
    Math.floor(10000000 + Math.random() * 90000000);

  const accountTypes = ["savings", "current", "credit"];

  const accounts = sampleCustomers.flatMap(customer =>
    accountTypes.map(type => ({
      accountNumber: generateAccountNumber(),
      accountType: type,
      branch: "Madurai Main Branch",
      ifsc: "BANK0001001",
      balance: currentBalance,
      createdAt: new Date(),
      updatedAt: new Date(),
      customerId: customer.id,
    }))
  );
  console.log(accounts);

  await createAccounts(accounts);
};