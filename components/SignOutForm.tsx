"use client";
import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import {createClient} from "@supabase/supabase-js";
import {toast} from "react-toastify";

const SignOutForm = () => {
  const handleSignOut = () => {
    // Clear username and password from session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');

    // Redirect to the login page
    window.location.href = '/';
  };

  return (
    <div>
      <button onClick={handleSignOut}
        className="bg-yellow-300 px-8 py-2 rounded-full mt-5 w-100">
        Sign Out
      </button>
      <div style={{ marginTop: '50px' }}></div>
    </div>
  );
};

export default SignOutForm;