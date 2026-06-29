import axiosInstance from "../services/axiosInstance";

export const getCustomer = (formData) =>
  axiosInstance.post("/",formData);

export const getCustomerAccounts = (formData) => {
  return axiosInstance.post("/", formData);
};

export const transferFund = (formData)=>{
  return axiosInstance.post("/transferfund",formData)
};

export const getAccountStatement = (account) =>
  axiosInstance.post("/statements", account);