import axiosInstance from "../services/axiosInstance";

export const getCustomer = () =>
  axiosInstance.post("/");
