import axiosInstance from "../services/axiosInstance";

export const getCustomer = (formData) => {
  return axiosInstance.post("/login", formData);
};

export const getCustomerAccounts = () => {
  return axiosInstance.get("/");
};

export const transferFund = (formData) => {
  return axiosInstance.post("/transferfund", formData)
};

export const getAccountStatement = (accountNumber) => {
  return axiosInstance.get(`/statements/${accountNumber}`);
};