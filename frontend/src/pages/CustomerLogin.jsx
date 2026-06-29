import { toast } from "react-toastify";
import { getCustomer } from "../api/customerApi";
import CustomerLoginForm from "../components/CustomerLoginForm";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const response = await getCustomer(formData);
      localStorage.setItem("customerCredentials", JSON.stringify(formData));
      toast.success("Login Successfull");
      navigate("/customer");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <CustomerLoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default CustomerLogin;
