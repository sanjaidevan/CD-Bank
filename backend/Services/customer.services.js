import { CustomerModel } from "../model/customerModel.js";

export const getCustomerById = async (customerID) => {
    const customer = await CustomerModel.findOne({ where: { email_id: customerID } });
    if (customer === null) {
        const error = new Error("No Customers Found");
        error.statusCode = 404;
        throw error;
    };
    console.log(customer);
    return customer;
};
