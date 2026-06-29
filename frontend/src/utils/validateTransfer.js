export const validateTransferForm = (values) => {
    const { sourceAccType, beneficiaryAccNum, amount } = values;
    if (!sourceAccType) return "Please select a source account";
    if (!beneficiaryAccNum) return "Please select a beneficiary account";
    if (!amount || parseFloat(amount) <= 0) return "Amount must be greater than 0";
    return null; // valid
};