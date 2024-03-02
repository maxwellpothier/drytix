"use client";
import {useForm} from "react-hook-form";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../../public/img/Dry.png";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import SignOutForm from "@/components/SignOutForm";

const LoginPage = () => {
    return (
		<div className="w-full flex justify-center">
			<div className="flex flex-col items-center mt-16 w-10/12 max-w-3xl">
				<Image className="w-20 h-20 z-20" src={logo} alt="" />
				<h1 className="text-4xl mb-8">DryTix</h1>
				<p className="text-l mb-4">
					Clean Team, Welcome to your dashboard login!
				</p>
				<a className="mb-10 text-blue-600 underline" href="/">
					Back Home
				</a>
				
				<RegisterForm />
				<LoginForm />
			</div>
			<ToastContainer />
		</div>
	);
}

export default LoginPage;