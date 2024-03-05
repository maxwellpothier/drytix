"use client";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

interface User {
  id: number;
  name: string;
}

const NumberForm = ({ triggerUpdate, setCurrentUser }) => {
  const hookForm = useForm<FormValues>();

  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const onSubmit = async (formData: FormValues) => {
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      toast.error("Please fill out all fields!");
      return;
    }

    const { data, error } = await supabase.from("customer").insert([
      {
        name: name,
        email: email,
        phone_number: phone,
        cleaner_name: sessionStorage.getItem("username"),
      },
    ]);

    let { data: customer, error: getError } = await supabase
      .from("customer")
      .select("id, name")
      .eq("name", name);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      hookForm.reset();
      toast.success("Number Added!");
    }
    setCurrentUser(customer[0]);
    triggerUpdate(true);
  };

  return (
    <form
      onSubmit={hookForm.handleSubmit(onSubmit)}
      className="bg-slate-800 py-6 px-6 rounded-lg w-full flex flex-col items-center mb-14 max-w-96"
    >
      <h3 className="text-white text-2xl text-center mb-4">Add a Customer</h3>
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
        className="bg-yellow-300 px-8 py-2 rounded-full mt-5 w-100"
        type="submit"
      >
        Add Contact Info
      </button>
    </form>
  );
};

export default NumberForm;
