
import { getAccountDetails, getTransactions } from '../controller/customerController.js';
import * as customerServices from '../services/customerServices.js'

vi.mock("../services/customerServices.js", () => ({
    fetchCustomerAccounts: vi.fn(),
    fetchTransactions: vi.fn(),
}));

const mockResponse = () => {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    };
};

describe("Customer Controller Unit Test", () => {
    beforeEach(() => { vi.clearAllMocks(); });

    it("Should get all accounts from a customer", async () => {
        customerServices.fetchCustomerAccounts.mockResolvedValue({
            accounts: [
                {
                    accountNumber: 15478936547,
                    accountType: "savings",
                    branch: "Dubai",
                    ifsc: "DU407",
                    balance: 5000,
                    customerId: "4a3b74d8-1627-4e68-afd9-ed074d487c98",
                },
                {
                    accountNumber: 8795787924,
                    accountType: "savings",
                    branch: "Dubai",
                    ifsc: "DU407",
                    balance: 500,
                    customerId: "4a3b74d8-1627-4e68-afd9-ed074d487c98",
                }]
        });
        const req = { customer: { customerID: "4a3b74d8-1627-4e68-afd9-ed074d487c98", firstName: "Guna" } };
        const res = mockResponse();
        const next = vi.fn();
        await getAccountDetails(req, res, next);
        expect(customerServices.fetchCustomerAccounts).toHaveBeenCalledWith("4a3b74d8-1627-4e68-afd9-ed074d487c98");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            customerName: "Guna",
            accounts: {
                accounts: [
                    {
                        accountNumber: 15478936547,
                        accountType: "savings",
                        branch: "Dubai",
                        ifsc: "DU407",
                        balance: 5000,
                        customerId: "4a3b74d8-1627-4e68-afd9-ed074d487c98",
                    },
                    {
                        accountNumber: 8795787924,
                        accountType: "savings",
                        branch: "Dubai",
                        ifsc: "DU407",
                        balance: 500,
                        customerId: "4a3b74d8-1627-4e68-afd9-ed074d487c98",
                    }]
            }
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("Should return no accounts Found for the customer", async () => {
        customerServices.fetchCustomerAccounts.mockResolvedValue([]);
        const req = { customer: { customerID: "4a3b74d8-1627-4e68-afd9-ed074d487c98", firstName: "Guna" } };
        const res = mockResponse();
        const next = vi.fn();
        await getAccountDetails(req, res, next);
        expect(customerServices.fetchCustomerAccounts).toHaveBeenCalledWith("4a3b74d8-1627-4e68-afd9-ed074d487c98");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "No Accounts Found" });
        expect(next).not.toHaveBeenCalled();
    });

    // it("Should throw Error",async () => {

    // })

    it("Should return all Transactions", async () => {
        customerServices.fetchTransactions.mockResolvedValue({
            id: 'ffc811b0-0e56-4ba0-8ca5-f004c8fb6c29',
            transactionDate: "2026-07-01T16: 47: 54.000Z",
            description: null,
            transactionType: 'debit',
            transactionStatus: 'completed',
            closingBalance: 69752,
            transferAmount: 1000,
            accountNumber: 59339629,
            customerId: '4a3b74d8-1627-4e68-afd9-ed074d487c98',
            createdAt: "2026-07-01T16: 47: 54.000Z",
            updatedAt: "2026-07-01T16: 47: 54.000Z"
        },)
        const req = { customer: { customerID: "4a3b74d8-1627-4e68-afd9-ed074d487c98", firstName: "Guna" }, params: { accountNumber: 8795787924 } };
        const res = mockResponse();
        const next = vi.fn();
        await getTransactions(req, res, next);
        expect(customerServices.fetchTransactions).toHaveBeenCalledWith(8795787924, "4a3b74d8-1627-4e68-afd9-ed074d487c98");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 'ffc811b0-0e56-4ba0-8ca5-f004c8fb6c29',
            transactionDate: "2026-07-01T16: 47: 54.000Z",
            description: null,
            transactionType: 'debit',
            transactionStatus: 'completed',
            closingBalance: 69752,
            transferAmount: 1000,
            accountNumber: 59339629,
            customerId: '4a3b74d8-1627-4e68-afd9-ed074d487c98',
            createdAt: "2026-07-01T16: 47: 54.000Z",
            updatedAt: "2026-07-01T16: 47: 54.000Z"
        },);
        expect(next).not.toHaveBeenCalled();
    })
})