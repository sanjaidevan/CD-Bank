export function validateFundTransferDetails(accountNumber, reciverAccount, amountTransfer) {
    if (!accountNumber || isNaN(accountNumber)) return false
    if (!reciverAccount || isNaN(reciverAccount)) return false
    if (!amountTransfer || isNaN(amountTransfer) || amountTransfer < 1) return false
    return true
}