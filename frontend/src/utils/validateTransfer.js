export const validateTransferForm = (values) => {
    const { sourceAccountNumber, beneficiaryAccountNumber, amount } = values;
    if (!sourceAccountNumber) return "Please select a source account";
    if (!beneficiaryAccountNumber) return "Please select a beneficiary account";
    if (!amount || parseFloat(amount) <= 0) return "Amount must be greater than 0";
    if (sourceAccountNumber === beneficiaryAccountNumber) return "Cannot Transfer Amount to Same Account"
    return null; // valid
};