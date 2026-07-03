import bcrypt from "bcrypt";
import { CustomerModel } from "../model/customerModel.js";

const createCustomer = async (customers) => {
    await CustomerModel.bulkCreate(customers);
}

export const sampleCustomers = async () => {

    const customers = [
        {
            firstName: "Arun",
            lastName: "Kumar",
            dob: "1995-03-15",
            email_id: "arun.kumar@example.com",
            mobile: "+919876543210",
            password: "password@123",
            isActive: "true"
        },
        {
            firstName: "Priya",
            lastName: "Sharma",
            dob: "1998-07-21",
            email_id: "priya.sharma@example.com",
            mobile: "+919876543211",
            password: "password123@",
            isActive: "true"
        },
        {
            firstName: "Rahul",
            lastName: "Verma",
            dob: "1992-11-05",
            email_id: "rahul.verma@example.com",
            mobile: "+919876543212",
            password: "123@password",
            isActive: "false"
        },
        {
            firstName: "Sneha",
            lastName: "Reddy",
            dob: "1997-01-30",
            email_id: "sneha.reddy@example.com",
            mobile: "+919876543213",
            password: "pass@word123",
            isActive: "true"
        },
        {
            firstName: "Vikram",
            lastName: "Singh",
            dob: "1990-09-12",
            email_id: "vikram.singh@example.com",
            mobile: "+919876543214",
            password: "password1@23",
            isActive: "true"
        },
        {
            firstName: "Anjali",
            lastName: "Patel",
            dob: "1996-04-18",
            email_id: "anjali.patel@example.com",
            mobile: "+919876543215",
            password: "wordpass123",
            isActive: "false"
        },
        {
            firstName: "Karthik",
            lastName: "Narayan",
            dob: "1994-12-08",
            email_id: "karthik.narayan@example.com",
            mobile: "+919876543216",
            password: "25password",
            isActive: "true"
        },
        {
            firstName: "Meera",
            lastName: "Iyer",
            dob: "1999-06-25",
            email_id: "meera.iyer@example.com",
            mobile: "+919876543217",
            password: "1234password",
            isActive: "true"
        },
        {
            firstName: "Suresh",
            lastName: "Babu",
            dob: "1991-08-14",
            email_id: "suresh.babu@example.com",
            mobile: "+919876543218",
            password: "pass@word123",
            isActive: "false"
        },
        {
            firstName: "Divya",
            lastName: "Krishnan",
            dob: "1993-02-27",
            email_id: "divya.krishnan@example.com",
            mobile: "+919876543219",
            password: "password@123",
            isActive: "true"
        }
    ];

    for (const customer of customers) {
        customer.password = await bcrypt.hash(customer.password, 10);
        console.log(customer.password);
    }

    console.log(customers);

    await createCustomer(customers);

    console.log("Sample customers inserted with hashed passwords");
};
