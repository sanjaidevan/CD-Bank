import { AccountModel } from "../model/accountModel.js";

const createAccounts = async (accounts) => {
    await AccountModel.bulkCreate(accounts);
}

const sampleCustomers = 
[
  {
    "customer_id": "3504d0b2-c392-4e52-9bde-6dbcc90c3f9a",
    "firstName": "Suresh",
    "lastName": "Babu",
    "dob": "1991-08-14",
    "email_id": "suresh.babu@example.com",
    "mobile": "+919876543218",
    "password": "$2b$10$2dJbsPmjPurNyA5mRxt79uhEHmnZ0xVmRZybzV7P0pLlJhOrdPYRG",
    "isActive": "false",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "379f1d04-0e23-41e7-9efa-7d7386ee0aed",
    "firstName": "Sneha",
    "lastName": "Reddy",
    "dob": "1997-01-30",
    "email_id": "sneha.reddy@example.com",
    "mobile": "+919876543213",
    "password": "$2b$10$LAHIrZlJYlJxa3i2w4Va9eX5eyQHVAddYFYA609L1zCDsD5YJ0kve",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "57d48bff-a50f-4c12-a528-435c15f3e486",
    "firstName": "Rahul",
    "lastName": "Verma",
    "dob": "1992-11-05",
    "email_id": "rahul.verma@example.com",
    "mobile": "+919876543212",
    "password": "$2b$10$5Y50v8xtjHYu04HELuVlO.HJ5ndPhUxfpwTF0gbmk2fnuTv6kL4Wi",
    "isActive": "false",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "5d0d6b34-33fe-42a2-9735-ebd18cc916eb",
    "firstName": "Karthik",
    "lastName": "Narayan",
    "dob": "1994-12-08",
    "email_id": "karthik.narayan@example.com",
    "mobile": "+919876543216",
    "password": "$2b$10$QdAxmagrmXywVsuPvZo.C.d6/gHptWVd3X/6/L5Qs.uw6GNin88wC",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "666d486c-db88-467e-87cc-3b7de2170fe1",
    "firstName": "Vikram",
    "lastName": "Singh",
    "dob": "1990-09-12",
    "email_id": "vikram.singh@example.com",
    "mobile": "+919876543214",
    "password": "$2b$10$kyIxvVX/7GrTVN4EAgAerO0mbPVSpDaX.V/q02ZQEWTruw9AHY/Je",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "6ba58649-2608-4da3-bb25-390381c65cce",
    "firstName": "Meera",
    "lastName": "Iyer",
    "dob": "1999-06-25",
    "email_id": "meera.iyer@example.com",
    "mobile": "+919876543217",
    "password": "$2b$10$0ymbY3u36U/zBnBUZq.3Uev4E6PSZWD703YVuvyTbXqxWcA0b4iUa",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "6fcb1d43-7282-482a-9b98-16c94312d6d8",
    "firstName": "Anjali",
    "lastName": "Patel",
    "dob": "1996-04-18",
    "email_id": "anjali.patel@example.com",
    "mobile": "+919876543215",
    "password": "$2b$10$iDRDyRkk0CCYSH7NWgMEPu5f.WlDzVa/fD.Urj7GFJK7NhSlPufZS",
    "isActive": "false",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "c2e9573b-28c4-4936-9985-1dc6b6b3dc6e",
    "firstName": "Arun",
    "lastName": "Kumar",
    "dob": "1995-03-15",
    "email_id": "arun.kumar@example.com",
    "mobile": "+919876543210",
    "password": "$2b$10$UF9LPJXV/.FtRo3bouXmeuRdpXua6O8PcVzpGM.xzDOg5FWSWUv6a",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "dc36e9e9-716a-4d37-a45d-d5bf45d6267f",
    "firstName": "Divya",
    "lastName": "Krishnan",
    "dob": "1993-02-27",
    "email_id": "divya.krishnan@example.com",
    "mobile": "+919876543219",
    "password": "$2b$10$gcve4ZL28xPMlWl6sfEQ7O41tF1I9XwSOExPeUZe3iVnYcwsTcNP2",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  },
  {
    "customer_id": "fa9510a7-ffa0-45f2-be7c-a4396823bcad",
    "firstName": "Priya",
    "lastName": "Sharma",
    "dob": "1998-07-21",
    "email_id": "priya.sharma@example.com",
    "mobile": "+919876543211",
    "password": "$2b$10$68ZHxCG5czUGXFTX.ODWqOOtJSW5KgMMUG5/KfNIck0MBvemzE5bi",
    "isActive": "true",
    "createdAt": "2026-06-25T09:49:15.000Z",
    "updatedAt": "2026-06-25T09:49:15.000Z"
  }
]

const generateAccountNumber = () =>
  Math.floor(10000000 + Math.random() * 90000000);

const accountTypes = ["savings", "current", "credit"];

const accounts = sampleCustomers.flatMap(customer =>
  accountTypes.map(type => ({
    acc_num: generateAccountNumber(),
    acc_type: type,
    branch: "Madurai Main Branch",
    ifc: "BANK0001001",
    createdAt: new Date(),
    updatedAt: new Date(),
    customer_id: customer.customer_id,
  }))
);
console.log(accounts);

createAccounts(accounts);