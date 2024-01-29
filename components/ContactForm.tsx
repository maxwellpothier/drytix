"use client";

import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import {createClient} from "@supabase/supabase-js";

type FormValues = {
	name: string;
	email: string;
	phone: string;
};

const ContactForm = () => {
	const hookForm = useForm<FormValues>();
	const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
	const supabase = createClient(supabaseUrl, supabaseKey);

	const onSubmit = async (formData: FormValues) => {
		console.log(formData);
		const {data, error} = await supabase.from("Contact").insert([
			{
				name: formData.name,
				email_address: formData.email,
				phone_number: formData.phone,
			},
		]);

		if (error) {
			console.error("Error inserting data:", error);
		} else {
			console.log("Data inserted successfully:", data);
		}
	};

	return (
		<form
			onSubmit={hookForm.handleSubmit(onSubmit)}
			className="bg-slate-800 py-6 px-16 rounded-lg w-8/12 flex flex-col items-center">
			<h3 className="text-white text-2xl text-center mb-4">
				Contact Us!
			</h3>
			<FormInput
				label={"Name"}
				name={"name"}
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
				className="bg-yellow-300 px-8 py-2 rounded-full mt-5 w-1/3"
				type="submit">
				Submit
			</button>
		</form>
	);
};

export default ContactForm;
