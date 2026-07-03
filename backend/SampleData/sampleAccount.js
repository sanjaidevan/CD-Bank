import { AccountModel } from "../model/accountModel.js";

const createAccounts = async (accounts) => {
  await AccountModel.bulkCreate(accounts);
}

export const sampleAccounts = async () => {
  const sampleCustomers =
    [
      {
        "customer_id": "8b90184d-9b8e-4977-9a61-0d1ee6e684f7",
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
        "customer_id": "d5f073ac-4a0f-4e72-84c7-a78aa24e76bc",
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
        "customer_id": "e47fb574-6b15-41d6-a9bb-b598001ba5d5",
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
        "customer_id": "06a4de6f-2da2-4c0c-aa6e-0c53e89f7db4",
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
        "customer_id": "285c04a2-0b8a-4a5e-be41-65d554c7554c",
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
        "customer_id": "f0613109-a749-40dd-a988-03fe26847645",
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
        "customer_id": "d7c02c1a-6518-49cb-abe2-ada481ed62eb",
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
        "customer_id": "52b5ee1d-ec29-4cbb-aa85-02889a57afd7",
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
        "customer_id": "cdd616a6-92ec-437f-b1df-ec74ad3c2a66",
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
        "customer_id": "f1ae11bb-be16-4c97-8d16-3b0937fc86da",
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

  await createAccounts(accounts);
};