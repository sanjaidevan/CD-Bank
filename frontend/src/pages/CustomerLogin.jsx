import { toast } from "react-toastify";
import { getCustomer } from "../api/customerApi";
import CustomerLoginForm from "../components/CustomerLoginForm";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const response = await getCustomer(formData);
      const { token, customer } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("customer", JSON.stringify(customer));
      toast.success("Login Successfull");
      navigate("/customer",{replace:true});
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  return (
    <>
      <CustomerLoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default CustomerLogin;
