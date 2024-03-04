"use client";
import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import {createClient} from "@supabase/supabase-js";
import {toast} from "react-toastify";

type FormValues = {
	name: string;
    username: string;
    pass: string;
	email: string;
	phone: string;
};

const RegisterForm = () => {
	const hookForm = useForm<FormValues>();

	const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
	const supabase = createClient(supabaseUrl, supabaseKey);

	const onSubmit = async (formData: FormValues) => {
		const {name, username, pass, email, phone} = formData;
		if (!name || !username || !pass || !email || !phone) {
			toast.error("Please fill out all fields!");
			return;
		}

		const {data, error} = await supabase.from("cleaner").insert([
			{
				business_name: name,
                contact_name: username,
                password: pass,
				contact_email: email,
				phone_number: phone,
			},
		]);

		if (error) {
			console.error("Error inserting data:", error);
		} else {
			hookForm.reset();
			toast.success("Thanks for registering! Directing you to the dashboard...");
            // Save username and password in local storage
			sessionStorage.setItem('username', username);
			sessionStorage.setItem('password', pass);
			// Redirect to dashboard
			window.location.href = '/demo';
		}
	};

	return (
		<form
			onSubmit={hookForm.handleSubmit(onSubmit)}
			className="bg-slate-800 py-6 px-6 rounded-lg w-full flex flex-col items-center mb-14 max-w-96">
			<h3 className="text-white text-2xl text-center mb-4">
				Register your Business!
			</h3>
			<FormInput
				label={"Business Name"}
				name={"name"}
				type={"text"}
				hookForm={hookForm}
			/>
            <FormInput
				label={"Username"}
				name={"username"}
				type={"text"}
				hookForm={hookForm}
			/>
            <FormInput
				label={"Password"}
				name={"pass"}
				type={"text"}
				hookForm={hookForm}
			/>
			<FormInput
				label={"Email"}
				name={"email"}
				type={"email"}
				hookForm={hookForm}
			/>
			<FormInput
				label={"Phone"}
				name={"phone"}
				type={"tel"}
				hookForm={hookForm}
			/>
			<button
				className="bg-yellow-300 px-8 py-2 rounded-full mt-5 w-100"
				type="submit">
				Sign Up
			</button>
		</form>
	);
};

export default RegisterForm;