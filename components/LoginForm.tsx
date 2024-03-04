"use client";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  username: string;
  pass: string;
  email: string;
  phone: string;
};

const LoginForm = () => {
  const hookForm = useForm<FormValues>();

  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const onSubmit = async (formData: FormValues) => {
    const { username, pass } = formData;
    if (!username || !pass) {
      toast.error("Please fill out all fields!");
      return;
    }

    // Check if the user exists in the database
    const { data, error } = await supabase
      .from("cleaner")
      .select("*")
      .eq("contact_name", username)
      .single();

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    if (data && data.password === pass) {
      // Successful login
      console.log("Login successful");
    } else {
      console.log(data.password);
      console.log(pass);
      // Invalid credentials
      toast.error("Invalid credentials");
      return;
    }

    if (error) {
      console.error("Error during login:", error);
    } else {
      hookForm.reset();
      toast.success("Thanks! Directing you to the dashboard...");
      // Save username and password in local storage
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", pass);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <form
      onSubmit={hookForm.handleSubmit(onSubmit)}
      className="bg-slate-800 py-6 px-6 rounded-lg w-full flex flex-col items-center mb-14 max-w-96"
    >
      <h3 className="text-white text-2xl text-center mb-4">
        Login to your Dashboard!
      </h3>
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
      <button
        className="bg-yellow-300 px-8 py-2 rounded-full mt-5 w-100"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
