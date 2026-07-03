export const validateTransferFundDetails = (req, res, next) => {
    try {
        const { accountNumber, receiverAccount, amountTransfer } = req.body;
        if (!accountNumber || isNaN(accountNumber)) return res.status(422).json({ message: "Customer Account Number is Invalid. Kindly check it" });
        if (!receiverAccount || isNaN(receiverAccount)) return res.status(422).json({ message: "Reciver Account Number is Invalid. Kindly check it" });
        if (!amountTransfer || isNaN(amountTransfer) || amountTransfer < 1) return res.status(422).json({ message: "Invalid Amount or Please check the Amount" });
        req.transferData = { accountNumber, receiverAccount, amountTransfer };
        next();
    } catch (error) {
        console.error("Error in validate Transfer Fund", error)
    }
}