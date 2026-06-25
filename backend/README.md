# CD Bank backend
A backend for CD-Bank using nodejs, expressjs, bcrypt for password hash
___

### Created model with migration 
Create three models using sequelize (mysql as DB), three models are **Customer Model** it stores the customer details, **Account Model** it stores all accounts of the user, **Transaction Model** it stores all the account transactions
___
## Database Models and Migrations

The CD Bank backend uses **Sequelize ORM** with **MySQL** as the database. Three core models have been created to manage customer information, bank accounts, and transaction records. These models represent the primary entities of the banking system and define the structure of the database tables.

### 1. Customer Model (`customer_tbl`)

The Customer model stores personal and authentication information for every registered bank customer.

#### Fields

| Field         | Type                   | Description                                                                 |
| ------------- | ---------------------- | --------------------------------------------------------------------------- |
| `customer_id` | UUID                   | Unique identifier for each customer. Automatically generated using UUID v4. |
| `firstName`   | String(50)             | Customer's first name.                                                      |
| `lastName`    | String(50)             | Customer's last name.                                                       |
| `dob`         | DateOnly               | Customer's date of birth.                                                   |
| `email_id`    | String(253)            | Customer's email address. Must be unique.                                   |
| `mobile`      | String(16)             | Customer's mobile number. Must be unique.                                   |
| `password`    | String                 | Stores the hashed password using bcrypt.                                    |
| `isActive`    | Enum (`true`, `false`) | Indicates whether the customer account is active or inactive.               |

#### Features

* Uses UUID as the primary key for better security and uniqueness.
* Enforces unique email addresses and mobile numbers.
* Stores encrypted passwords instead of plain text passwords.
* Supports account activation/deactivation through the `isActive` field.

#### Table Name

```sql
customer_tbl
```

---

### 2. Account Model (`acc_tbl`)

The Account model stores banking account information associated with customers.

#### Fields

| Field      | Type                                  | Description                                     |
| ---------- | ------------------------------------- | ----------------------------------------------- |
| `acc_num`  | Integer                               | Unique account number and primary key.          |
| `acc_type` | Enum (`savings`, `current`, `credit`) | Type of bank account.                           |
| `branch`   | String                                | Branch where the account is maintained.         |
| `ifc`      | String                                | IFSC/branch code used for banking transactions. |

#### Features

* Supports multiple account types:

  * Savings Account
  * Current Account
  * Credit Account
* Stores branch and IFSC details required for banking operations.
* Uses account number as the primary identifier.

#### Table Name

```sql
acc_tbl
```

---

### 3. Transaction Model (`transaction_tbl`)

The Transaction model records all financial activities performed on customer accounts.

#### Fields

| Field                | Type                                                 | Description                                                                 |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `transaction_id`     | String                                               | Unique transaction identifier and primary key.                              |
| `transaction_date`   | DateTime                                             | Date and time when the transaction occurred. Defaults to current timestamp. |
| `description`        | String                                               | Optional description or remarks about the transaction.                      |
| `transaction_type`   | Enum (`debit`, `credit`)                             | Specifies whether money was withdrawn or deposited.                         |
| `transaction_status` | Enum (`initiated`, `pending`, `completed`, `failed`) | Current state of the transaction.                                           |
| `balance`            | Integer                                              | Account balance after processing the transaction.                           |

#### Features

* Automatically records transaction timestamps.
* Supports debit and credit transactions.
* Tracks transaction lifecycle through status values.
* Maintains updated account balance after each transaction.
* Provides an audit trail for banking activities.

#### Table Name

```sql
transaction_tbl
```

---

### Database Architecture

The backend follows a relational database structure where:

* A customer can own one or more bank accounts.
* Each account can have multiple transaction records.
* Customer credentials are secured using bcrypt password hashing.
* Sequelize ORM handles model definitions, synchronization, and database interactions.
* MySQL serves as the persistent storage layer for all banking data.

This structure provides a scalable foundation for implementing banking features such as account management, fund transfers, balance inquiries, transaction history, and customer authentication.

## Model Associations

The CD Bank backend uses Sequelize associations to establish relationships between customers, accounts, and transactions. These relationships reflect a real-world banking system where a customer can own multiple accounts and each account can have multiple transactions.

### 1. Customer ↔ Account Relationship

A **one-to-many (1:N)** relationship exists between customers and accounts.

```javascript
CustomerModel.hasMany(AccountModel, {
    foreignKey: "customer_id",
    as: "accounts",
    onDelete: "CASCADE",
});

AccountModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id",
    as: "customer",
});
```

#### Description

* A single customer can own multiple bank accounts.
* Each account belongs to exactly one customer.
* The `customer_id` field acts as the foreign key in the `acc_tbl` table.
* The alias `accounts` allows retrieval of all accounts associated with a customer.
* The alias `customer` allows retrieval of the account owner information.
* `CASCADE` deletion ensures that when a customer is deleted, all associated accounts are automatically removed.

#### Example

```text
Customer
 ├── Savings Account
 ├── Current Account
 └── Credit Account
```

---

### 2. Account ↔ Transaction Relationship

A **one-to-many (1:N)** relationship exists between accounts and transactions.

```javascript
AccountModel.hasMany(TransactionModel, {
    foreignKey: "acc_num",
    as: "transaction",
    onDelete: "CASCADE",
});

TransactionModel.belongsTo(AccountModel, {
    foreignKey: "acc_num",
    as: "account",
});
```

#### Description

* A single account can have multiple transactions.
* Each transaction belongs to exactly one account.
* The `acc_num` field acts as the foreign key in the `transaction_tbl` table.
* The alias `transaction` provides access to all transactions related to an account.
* The alias `account` provides access to the account details associated with a transaction.
* `CASCADE` deletion ensures that when an account is deleted, all associated transactions are automatically removed.

#### Example

```text
Account
 ├── Transaction 1 (Credit)
 ├── Transaction 2 (Debit)
 ├── Transaction 3 (Credit)
 └── Transaction 4 (Debit)
```

---

## Overall Database Relationship Structure

The complete relationship hierarchy is:

```text
Customer
    │
    ├── Account 1
    │      ├── Transaction 1
    │      ├── Transaction 2
    │      └── Transaction 3
    │
    ├── Account 2
    │      ├── Transaction 4
    │      └── Transaction 5
    │
    └── Account 3
           ├── Transaction 6
           └── Transaction 7
```

### Relationship Summary

| Parent Model | Child Model | Relationship | Foreign Key   |
| ------------ | ----------- | ------------ | ------------- |
| Customer     | Account     | One-to-Many  | `customer_id` |
| Account      | Transaction | One-to-Many  | `acc_num`     |

### Benefits of These Associations

* Maintains referential integrity between tables.
* Simplifies complex database queries using Sequelize's eager loading (`include`).
* Automatically handles joins between related tables.
* Supports cascading deletion of dependent records.
* Provides a clear hierarchy of customers, accounts, and transactions within the banking system.

These associations form the core data structure of the CD Bank backend and enable efficient management of customer accounts and transaction histories.
