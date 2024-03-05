"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../../public/img/Dry.png";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import Banner from "../../components/Banner";

const RegisterPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
        <Banner dashboard={false} />
        <Image className="w-20 h-20 z-20" src={logo} alt="" />
        <h1 className="text-4xl mb-8">DryTix</h1>
        <p className="text-l mb-4">
          Welcome to DryTix! Register your business to get started.
        </p>

        <RegisterForm />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
